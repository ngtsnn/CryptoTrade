const Token = artifacts.require("Token");
const CoinTrader = artifacts.require("CoinTrader");

module.exports = async function(deployer) {
  //deploy token
  await deployer.deploy(Token);
  const token = await Token.deployed();
  
  //deploy coin trader
  await deployer.deploy(CoinTrader, token.address, "0xAD13bb906dfE2ec9995f73c601e51aF4722988b8");
  const coinTrader = await CoinTrader.deployed(token.address);

  await token.transfer(coinTrader.address, "1000000000000000000000000");
};
