// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {BlitzVotes} from "../src/BlitzVotes.sol";

contract DeployBlitzVotes is Script {
    function run() external {
        vm.startBroadcast();
        BlitzVotes bv = new BlitzVotes();
        console.log("BlitzVotes deployed at:", address(bv));
        vm.stopBroadcast();
    }
}
