// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract BlitzVotes {
    mapping(bytes32 => uint256) public votes;
    uint256 public totalVotes;

    event Voted(bytes32 indexed entity, address indexed voter, uint256 newTotal);

    function vote(bytes32 entity) external {
        votes[entity]++;
        totalVotes++;
        emit Voted(entity, msg.sender, votes[entity]);
    }

    function voteBatch(bytes32[] calldata entities) external {
        for (uint256 i = 0; i < entities.length; i++) {
            votes[entities[i]]++;
            emit Voted(entities[i], msg.sender, votes[entities[i]]);
        }
        totalVotes += entities.length;
    }

    function getVotes(bytes32[] calldata entities) external view returns (uint256[] memory) {
        uint256[] memory results = new uint256[](entities.length);
        for (uint256 i = 0; i < entities.length; i++) {
            results[i] = votes[entities[i]];
        }
        return results;
    }
}
