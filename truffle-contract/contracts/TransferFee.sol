// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransferFee{
    event TransferToContract(address buyer, address indexed owner, uint indexed product_id, uint indexed date, uint reservationId);
    event TransferToOwner(address buyer, address indexed owner, uint indexed product_id);

    struct ReservationInfo {
        address owner;
        address buyer;
        uint product_id;
        uint date;
        uint price;
    }

    mapping (uint => ReservationInfo) public ReservationMapping;

    uint private id = 0;

    receive() external payable {
    }

    /// @dev : 예약자가 contract로 송금하는 함수
    function transferToContract(address owner, uint product_id, uint date) public payable {
        if (msg.value > msg.sender.balance) {revert();}
        require(msg.value > 0, "You cannot send 0 klay");

        uint reservationId = id;

        payable(address(this)).transfer(msg.value);
        ReservationMapping[id] = ReservationInfo(owner, msg.sender, product_id, date, msg.value);
        id += 1;

        emit TransferToContract(msg.sender, owner, product_id, date, reservationId);
    }

    /// @dev : contract에서 집주인에게 송금하는 함수
    function transferToOwner(uint reservationId, address buyer_address) public payable {
        require(ReservationMapping[reservationId].price <= address(this).balance, "There is no money to transfer to the contract.");
        require(ReservationMapping[reservationId].buyer == buyer_address, "It's not a buyer");

        uint fee = ReservationMapping[reservationId].price;
        address owner = ReservationMapping[reservationId].owner;
        address buyer = ReservationMapping[reservationId].buyer;
        uint product_id = ReservationMapping[reservationId].product_id;

        payable(owner).transfer(fee);
        delete ReservationMapping[reservationId];

        emit TransferToOwner(buyer, owner, product_id);
    }

    function getBalanceOfContract() public view returns (uint) {
        return address(this).balance;
    }

    function getBalanceOfAddress(address _addr) public view returns (uint) {
        return _addr.balance;
    }
}
