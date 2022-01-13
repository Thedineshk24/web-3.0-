// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transcations {
    uint256 transcationCount;

// event is similar like fn in js which we can call later
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

// struct stand for structure which is an type of object
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain (address payable receiver, uint amount, string memory message, string memory keyword) public {
        transcationCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions () public view returns (TransferStruct[] memory) {
        return transactions;
    }
        
   function getTranscationCount() public view returns (uint256) {
       return transcationCount;
   }        
}