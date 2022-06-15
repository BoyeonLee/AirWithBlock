// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransferFee{
    event TransferSuccess(address _from, address _to, uint _fee);

    function transferFee(address payable _to) public payable {
        require(_to > address(0), "This is not a valid address");
        require(msg.sender.balance >= msg.value, "There is not enough klay in the account");
        require(msg.value > 0, "You cannot send 0 klay");

        _to.transfer(msg.value);

        emit TransferSuccess(msg.sender, _to, msg.value);
    }

}