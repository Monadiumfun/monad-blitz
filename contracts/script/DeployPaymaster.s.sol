// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {BlitzGamePaymaster} from "../src/BlitzGamePaymaster.sol";
import {IEntryPoint} from "@account-abstraction/interfaces/IEntryPoint.sol";

contract DeployPaymaster is Script {
    function run() external {
        address entryPoint = vm.envAddress("ENTRY_POINT");
        address owner = vm.envAddress("OWNER");
        address signer = vm.envAddress("VERIFYING_SIGNER");

        vm.startBroadcast();

        BlitzGamePaymaster paymaster = new BlitzGamePaymaster(
            IEntryPoint(entryPoint),
            owner,
            signer
        );

        console.log("BlitzGamePaymaster deployed at:", address(paymaster));

        vm.stopBroadcast();
    }
}
