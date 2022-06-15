const Migrations = artifacts.require("Migrations");
const TransferFee = artifacts.require("./TransferFee.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(TransferFee);
};
