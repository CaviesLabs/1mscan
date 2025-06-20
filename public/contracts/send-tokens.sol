// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);
}

contract SendToken {
    address public owner;
    event TokensSent(
        address indexed token,
        address indexed recipient,
        uint256 amount
    );
    event EtherSent(address indexed recipient, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Function to send multiple ERC20 tokens and Ether to a single address
    function multiSend(
        address[] memory tokens,
        uint256[] memory tokenAmounts,
        address payable recipient
    ) external payable {
        require(
            tokens.length == tokenAmounts.length,
            "Tokens and amounts length mismatch"
        );

        // Send tokens
        for (uint256 i = 0; i < tokens.length; i++) {
            IERC20 token = IERC20(tokens[i]);
            require(
                token.transferFrom(msg.sender, recipient, tokenAmounts[i]),
                "Token transfer failed"
            );
            emit TokensSent(tokens[i], recipient, tokenAmounts[i]);
        }

        // Send Ether
        if (msg.value > 0) {
            recipient.transfer(msg.value);
            emit EtherSent(recipient, msg.value);
        }
    }

    // Function to withdraw Ether from the contract
    function withdrawEther(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient Ether balance");
        payable(msg.sender).transfer(amount);
    }

    // Function to withdraw ERC20 tokens from the contract
    function withdrawTokens(address token, uint256 amount) external onlyOwner {
        IERC20(token).transfer(msg.sender, amount);
    }

    // Fallback function to accept Ether
    receive() external payable {}
}

// 0.8.26+commit.8a97fa7a
// EVM Version: default (cancun)

// {
// 	"language": "Solidity",
// 	"settings": {
// 		"optimizer": {
// 			"enabled": true,
// 			"runs": 400
// 		},
// 		"outputSelection": {
// 			"*": {
// 			"": ["ast"],
// 			"*": ["abi", "metadata", "devdoc", "userdoc", "storageLayout", "evm.legacyAssembly", "evm.bytecode", "evm.deployedBytecode", "evm.methodIdentifiers", "evm.gasEstimates", "evm.assembly"]
// 			}
// 		}
// 	}
// }
