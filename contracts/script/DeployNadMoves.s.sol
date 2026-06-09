// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {NadMoves} from "../src/NadMoves.sol";

contract DeployNadMoves is Script {
    function run() external {
        vm.startBroadcast();

        NadMoves moves = new NadMoves();

        console.log("NadMoves deployed at:", address(moves));

        vm.stopBroadcast();
    }
}
