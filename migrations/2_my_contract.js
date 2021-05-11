const Token = artifacts.require("Token");
const CoinTrader = artifacts.require("CoinTrader");

module.exports = async function(deployer) {
  //deploy token
  await deployer.deploy(Token);
  const token = await Token.deployed();
  
  //deploy coin trader
  await deployer.deploy(CoinTrader, token.address, "0x8Ece273d4d7593A7cc5011dD8966a4A248413058");
  const coinTrader = await CoinTrader.deployed(token.address);

  await token.transfer(coinTrader.address, "1000000000000000000000000");
};
