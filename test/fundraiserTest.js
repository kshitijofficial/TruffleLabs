const Fundraiser = artifacts.require("./Fundraiser.sol");

contract("Fundraiser", (accounts) => {
  let contract = null;
  let account = null;
  before(async () => {
    contract = await Fundraiser.deployed();
    account = accounts[0];
  });
  it("check the participants array after participation", async () => {
    await contract.sendMoney({ from: account, value: 14 });
    let backer = await contract.backers(0);
    assert.equal(backer, account);
  });
  it("check the balance increase", async () => {
    let balanceBefore = await contract.getBalance();

    await contract.sendMoney({ from: account, value: 1 });

    let balanceAfter = await contract.getBalance();

    assert.equal(
      balanceAfter.toString(),
      parseInt(balanceBefore.toString()) + 1
    );
  });
  it("check the balance after the fundraising ends", async () => {
    const contractOwner = await contract.owner();
    let contractsBalanceBefore = await contract.getBalance();
    let ownersBalanceBefore = await web3.eth.getBalance(contractOwner);

    await contract.endFundraising({ from: contractOwner });
    let contractsBalanceAfter = await contract.getBalance();
    let ownersBalanceAfter = await web3.eth.getBalance(contractOwner);

    assert.equal(contractsBalanceAfter, 0);

    assert.equal(
      ownersBalanceBefore >= ownersBalanceAfter + contractsBalanceBefore,
      true
    );
  });
});
