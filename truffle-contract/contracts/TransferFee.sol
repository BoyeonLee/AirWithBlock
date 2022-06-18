// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransferFee{
    event TransferToContract(address from, address to, uint fee);
    event TransferToOwner(address from, address to, uint fee);

    mapping (address => mapping (address => uint)) public buyerBalances;

    receive() external payable {
    }

    /// @dev : 예약자가 contract로 송금하는 함수
    function transferToContract(address _owner) public payable {
        require(msg.sender.balance >= msg.value, "There is not enough klay in the account");
        require(msg.value > 0, "You cannot send 0 klay");

        payable(address(this)).transfer(msg.value);
        buyerBalances[msg.sender][_owner] += msg.value;

        emit TransferToContract(msg.sender, address(this), msg.value);
    }

    /// @dev : contract에서 집주인에게 송금하는 함수
    function transferToOwner(address payable _owner, address _buyer) public payable {
        require(_owner > address(0), "This is not a valid address");
        require(buyerBalances[_buyer][_owner] <= address(this).balance, "There is no money to transfer to the contract.");

        _owner.transfer(buyerBalances[_buyer][_owner]);

        emit TransferToOwner(address(this), _owner, buyerBalances[_buyer][_owner]);
    }

    function getBalanceOfContract() public view returns (uint) {
        return address(this).balance;
    }

}
