// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract NadGames {
    enum GameType { HigherLower, LaserParty, DeathRun }
    enum Status { Active, Settled, CashedOut, Expired }

    struct Game {
        address player;
        GameType gameType;
        uint256 wager;
        bytes32 seedHash;
        uint256 startBlock;
        Status status;
        uint256 payout;
        bytes32 revealedSeed;
    }

    IERC20 public immutable token;
    address public owner;
    address public signer;

    uint256 public gameCount;
    mapping(uint256 => Game) public games;
    mapping(address => uint256[]) public playerGames;

    uint256 public constant MAX_MULTIPLIER_BPS = 100_000;
    uint256 public constant EXPIRY_BLOCKS = 7200;
    uint256 public constant BPS = 10_000;

    event GameCreated(uint256 indexed gameId, address indexed player, GameType gameType, uint256 wager, bytes32 seedHash);
    event GameSettled(uint256 indexed gameId, bytes32 seed, uint256 multiplierBps, uint256 payout);
    event GameCashedOut(uint256 indexed gameId, uint256 multiplierBps, uint256 payout);
    event GameExpired(uint256 indexed gameId);

    error NotOwner();
    error NotSigner();
    error InvalidGame();
    error GameNotActive();
    error InvalidSeed();
    error MultiplierTooHigh();
    error TransferFailed();
    error InvalidSignature();
    error GameExpiredErr();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    modifier onlySigner() {
        if (msg.sender != signer) revert NotSigner();
        _;
    }

    constructor(address _token, address _signer) {
        token = IERC20(_token);
        owner = msg.sender;
        signer = _signer;
    }

    function createGame(
        GameType gameType,
        uint256 wager,
        bytes32 seedHash
    ) external returns (uint256 gameId) {
        if (!token.transferFrom(msg.sender, address(this), wager)) revert TransferFailed();

        gameId = gameCount++;
        games[gameId] = Game({
            player: msg.sender,
            gameType: gameType,
            wager: wager,
            seedHash: seedHash,
            startBlock: block.number,
            status: Status.Active,
            payout: 0,
            revealedSeed: bytes32(0)
        });
        playerGames[msg.sender].push(gameId);

        emit GameCreated(gameId, msg.sender, gameType, wager, seedHash);
    }

    function settle(
        uint256 gameId,
        bytes32 seed,
        uint256 multiplierBps
    ) external onlySigner {
        Game storage g = games[gameId];
        if (g.player == address(0)) revert InvalidGame();
        if (g.status != Status.Active) revert GameNotActive();
        if (keccak256(abi.encodePacked(seed)) != g.seedHash) revert InvalidSeed();
        if (multiplierBps > MAX_MULTIPLIER_BPS) revert MultiplierTooHigh();

        g.revealedSeed = seed;
        g.status = Status.Settled;

        uint256 payout = (g.wager * multiplierBps) / BPS;
        g.payout = payout;

        if (payout > 0) {
            uint256 bal = token.balanceOf(address(this));
            if (payout > bal) payout = bal;
            if (!token.transfer(g.player, payout)) revert TransferFailed();
        }

        emit GameSettled(gameId, seed, multiplierBps, payout);
    }

    function cashout(
        uint256 gameId,
        uint256 multiplierBps,
        bytes32 seed,
        bytes memory sig
    ) external {
        Game storage g = games[gameId];
        if (g.player != msg.sender) revert InvalidGame();
        if (g.status != Status.Active) revert GameNotActive();
        if (multiplierBps > MAX_MULTIPLIER_BPS) revert MultiplierTooHigh();
        if (keccak256(abi.encodePacked(seed)) != g.seedHash) revert InvalidSeed();

        bytes32 hash = keccak256(abi.encodePacked(gameId, g.player, multiplierBps, seed));
        bytes32 ethHash = _ethSignedHash(hash);
        if (_recover(ethHash, sig) != signer) revert InvalidSignature();

        g.revealedSeed = seed;
        g.status = Status.CashedOut;

        uint256 payout = (g.wager * multiplierBps) / BPS;
        g.payout = payout;

        if (payout > 0) {
            uint256 bal = token.balanceOf(address(this));
            if (payout > bal) payout = bal;
            if (!token.transfer(g.player, payout)) revert TransferFailed();
        }

        emit GameCashedOut(gameId, multiplierBps, payout);
    }

    function expireGame(uint256 gameId) external {
        Game storage g = games[gameId];
        if (g.player == address(0)) revert InvalidGame();
        if (g.status != Status.Active) revert GameNotActive();
        if (block.number < g.startBlock + EXPIRY_BLOCKS) revert GameExpiredErr();

        g.status = Status.Expired;

        if (!token.transfer(g.player, g.wager)) revert TransferFailed();

        emit GameExpired(gameId);
    }

    function verifyGame(uint256 gameId) external view returns (
        address player,
        GameType gameType,
        uint256 wager,
        bytes32 seedHash,
        bytes32 revealedSeed,
        bool seedValid,
        Status status,
        uint256 payout
    ) {
        Game storage g = games[gameId];
        player = g.player;
        gameType = g.gameType;
        wager = g.wager;
        seedHash = g.seedHash;
        revealedSeed = g.revealedSeed;
        seedValid = g.revealedSeed != bytes32(0) && keccak256(abi.encodePacked(g.revealedSeed)) == g.seedHash;
        status = g.status;
        payout = g.payout;
    }

    function getPlayerGames(address player) external view returns (uint256[] memory) {
        return playerGames[player];
    }

    function setSigner(address _signer) external onlyOwner {
        signer = _signer;
    }

    function depositLiquidity(uint256 amount) external {
        if (!token.transferFrom(msg.sender, address(this), amount)) revert TransferFailed();
    }

    function withdrawLiquidity(uint256 amount) external onlyOwner {
        if (!token.transfer(owner, amount)) revert TransferFailed();
    }

    function _ethSignedHash(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }

    function _recover(bytes32 hash, bytes memory sig) internal pure returns (address) {
        if (sig.length != 65) return address(0);
        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
        if (v < 27) v += 27;
        return ecrecover(hash, v, r, s);
    }
}
