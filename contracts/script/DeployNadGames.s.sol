// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {NadGames} from "../src/NadGames.sol";

contract DeployNadGames is Script {
    function run() external {
        address token = vm.envAddress("TOKEN_ADDRESS");
        address signerAddr = vm.envAddress("SIGNER");

        vm.startBroadcast();

        NadGames ng = new NadGames(token, signerAddr);
        console.log("NadGames deployed at:", address(ng));

        vm.stopBroadcast();
    }
}
