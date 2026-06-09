// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title BLITZ — game token for NadGames (Monad testnet)
/// @notice Self-contained ERC20 with a large supply, owner mint, batch airdrop,
///         and a public one-time claim faucet so players can grab tokens to play.
contract BlitzToken {
    string public constant name = "Blitz";
    string public constant symbol = "BLITZ";
    uint8 public constant decimals = 18;

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    address public owner;
    /// @notice amount handed out per public claim() call
    uint256 public claimAmount = 1_000 ether;
    mapping(address => bool) public hasClaimed;
    /// @notice addresses allowed to call mint/airdrop (e.g. the game backend)
    mapping(address => bool) public minters;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Claimed(address indexed to, uint256 amount);
    event MinterSet(address indexed who, bool allowed);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    modifier onlyMinter() {
        require(msg.sender == owner || minters[msg.sender], "not minter");
        _;
    }

    /// @param initialSupply whole tokens (will be scaled by 1e18) minted to deployer
    constructor(uint256 initialSupply) {
        owner = msg.sender;
        minters[msg.sender] = true;
        _mint(msg.sender, initialSupply * 1 ether);
    }

    // --- ERC20 ---
    function transfer(address to, uint256 value) external returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) external returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        if (allowed != type(uint256).max) {
            require(allowed >= value, "allowance");
            allowance[from][msg.sender] = allowed - value;
        }
        _transfer(from, to, value);
        return true;
    }

    function _transfer(address from, address to, uint256 value) internal {
        require(to != address(0), "zero addr");
        uint256 bal = balanceOf[from];
        require(bal >= value, "balance");
        unchecked {
            balanceOf[from] = bal - value;
            balanceOf[to] += value;
        }
        emit Transfer(from, to, value);
    }

    function _mint(address to, uint256 value) internal {
        totalSupply += value;
        unchecked {
            balanceOf[to] += value;
        }
        emit Transfer(address(0), to, value);
    }

    // --- distribution ---
    /// @notice one-time public faucet so any player can start with tokens
    function claim() external {
        require(!hasClaimed[msg.sender], "claimed");
        hasClaimed[msg.sender] = true;
        _mint(msg.sender, claimAmount);
        emit Claimed(msg.sender, claimAmount);
    }

    /// @notice mint to a single address (owner/backend)
    function mint(address to, uint256 value) external onlyMinter {
        _mint(to, value);
    }

    /// @notice batch airdrop a fixed amount to many recipients
    function airdrop(address[] calldata recipients, uint256 amountEach) external onlyMinter {
        uint256 scaled = amountEach;
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], scaled);
        }
    }

    // --- admin ---
    function setClaimAmount(uint256 amount) external onlyOwner {
        claimAmount = amount;
    }

    function setMinter(address who, bool allowed) external onlyOwner {
        minters[who] = allowed;
        emit MinterSet(who, allowed);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "zero addr");
        owner = newOwner;
    }
}
