// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Fundraiser {
    address public owner;
    address[] public backers;

    constructor() {
        owner = msg.sender;
    }

    function sendMoney() public payable {
        require(msg.value > 0, "No Ether were sent.");
        backers.push(msg.sender);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function endFundraising() public {
        require(
            msg.sender == owner,
            "Only the owner is allowed to end the fundraising."
        );
        payable(owner).transfer(address(this).balance);
    }
}
