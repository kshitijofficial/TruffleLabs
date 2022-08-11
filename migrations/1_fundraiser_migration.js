const Migrations = artifacts.require("Fundraiser");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
