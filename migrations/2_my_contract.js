const Token = artifacts.require("Token");
const CoinTrader = artifacts.require("CoinTrader");

module.exports = async function(deployer) {
  //deploy token
  await deployer.deploy(Token);
  const token = await Token.deployed();
  
  //deploy coin trader
  await deployer.deploy(CoinTrader, token.address);
  const coinTrader = await CoinTrader.deployed(token.address);

  await token.transfer(coinTrader.address, "1000000000000000000000000");
};
