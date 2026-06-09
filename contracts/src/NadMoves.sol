// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract NadMoves {
    event MoveRecorded(
        uint256 indexed gameId,
        address indexed player,
        uint8 indexed moveType,
        uint256 value
    );

    function recordMove(uint256 gameId, uint8 moveType, uint256 value) external {
        emit MoveRecorded(gameId, msg.sender, moveType, value);
    }
}
