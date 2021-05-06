
const Query = artifacts.require("../contracts/Query.sol");

module.exports = function(deployer) {
  deployer.deploy(Query);
};