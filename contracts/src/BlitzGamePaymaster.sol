// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@account-abstraction/core/BasePaymaster.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract BlitzGamePaymaster is BasePaymaster {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;
    using UserOperationLib for PackedUserOperation;

    address public immutable verifyingSigner;

    uint256 private constant VALID_TIMESTAMP_OFFSET = PAYMASTER_DATA_OFFSET;
    uint256 private constant SIGNATURE_OFFSET = VALID_TIMESTAMP_OFFSET + 64;

    event GasSponsored(address indexed sender, uint256 gasUsed);

    error InvalidSignatureLength(uint256 length);

    constructor(
        IEntryPoint _entryPoint,
        address _owner,
        address _verifyingSigner
    ) BasePaymaster(_entryPoint, _owner) {
        verifyingSigner = _verifyingSigner;
    }

    function _validateEntryPointInterface(IEntryPoint) internal pure override {}


    function getHash(
        PackedUserOperation calldata userOp,
        uint48 validUntil,
        uint48 validAfter
    ) public view returns (bytes32) {
        return keccak256(
            abi.encode(
                userOp.sender,
                userOp.nonce,
                keccak256(userOp.initCode),
                keccak256(userOp.callData),
                userOp.accountGasLimits,
                userOp.preVerificationGas,
                userOp.gasFees,
                block.chainid,
                address(this),
                validUntil,
                validAfter
            )
        );
    }

    function _validatePaymasterUserOp(
        PackedUserOperation calldata userOp,
        bytes32,
        uint256
    ) internal view override returns (bytes memory context, uint256 validationData) {
        (
            uint48 validUntil,
            uint48 validAfter,
            bytes calldata signature
        ) = _parsePaymasterData(userOp.paymasterAndData);

        if (signature.length != 65) {
            revert InvalidSignatureLength(signature.length);
        }

        bytes32 hash = getHash(userOp, validUntil, validAfter)
            .toEthSignedMessageHash();

        address recovered = hash.recover(signature);

        if (recovered != verifyingSigner) {
            return ("", _packValidationData(true, validUntil, validAfter));
        }

        return (
            abi.encode(userOp.sender),
            _packValidationData(false, validUntil, validAfter)
        );
    }

    function _postOp(
        PostOpMode,
        bytes calldata context,
        uint256 actualGasCost,
        uint256
    ) internal override {
        address sender = abi.decode(context, (address));
        emit GasSponsored(sender, actualGasCost);
    }

    function _parsePaymasterData(
        bytes calldata paymasterAndData
    )
        internal
        pure
        returns (uint48 validUntil, uint48 validAfter, bytes calldata signature)
    {
        validUntil = uint48(bytes6(paymasterAndData[VALID_TIMESTAMP_OFFSET:VALID_TIMESTAMP_OFFSET + 6]));
        validAfter = uint48(bytes6(paymasterAndData[VALID_TIMESTAMP_OFFSET + 6:VALID_TIMESTAMP_OFFSET + 12]));
        signature = paymasterAndData[SIGNATURE_OFFSET:];
    }

    function withdraw(address payable to, uint256 amount) external onlyOwner {
        (bool ok, ) = to.call{value: amount}("");
        require(ok, "withdraw failed");
    }

    receive() external payable {}
}
