const TransferFee = artifacts.require("./TransferFee.sol");
const fs = require("fs");

module.exports = function (deployer) {
  deployer.deploy(TransferFee).then(() => {
    if (TransferFee._json) {
      fs.writeFile("deployedABI", JSON.stringify(TransferFee._json.abi, 2), (err) => {
        if (err) throw err;
        console.log(`The abi of ${TransferFee._json.contractName} is recorded on deployedABI file`);
      });
    }

    // 2. 최근에 배포한 컨트랙트 주소를 'deployedAddress'에 기록합니다.
    fs.writeFile("deployedAddress", TransferFee.address, (err) => {
      if (err) throw err;
      console.log(
        `The deployed contract address * ${TransferFee.address} * is recorded on deployedAddress file`
      );
    });
  });
};
