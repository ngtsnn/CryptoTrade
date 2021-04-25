const Token = artifacts.require("Token");
const CoinTrader = artifacts.require("CoinTrader");

module.exports = async function(deployer) {
  //deploy token
  await deployer.deploy(Token);
  const token = await Token.deployed();
  
  //deploy coin trader
  await deployer.deploy(CoinTrader);
  const coinTrader = await CoinTrader.deployed();

  await token.transfer(coinTrader.address, "1000000000000000000000000");
};
