const Token = artifacts.require("Token");
const CoinTrader = artifacts.require("CoinTrader");

require("chai")
  .use(require("chai-as-promised"))
  .should()

const tokenize = function (ether) 
{ 
  return web3.utils.toWei(ether, "ether");
}

contract("CoinTrader", ([deployer, investor, tester1, tester2]) => {

  let token, coinTrader

  // initial things
  before(async () => {
    token = await Token.new();
    coinTrader = await CoinTrader.new(token.address);
    await token.transfer(coinTrader.address, tokenize("1000000"));
  })

  // Testing for deploying
  describe("Check deployment", async () => {
    it("Testing for deploying", async () => {
      let token1Address = await coinTrader.token();
      assert.equal(token.address, token1Address);
    });
  });


  // Testing for purchasing
  describe("Check purchases", async () => {
    it("Testing for buying coins", async () => {
      // purchasing process
      let result = await coinTrader.purchase({from: investor, value: tokenize("1")});
      
      // check balance of 
      let balanceTest = (await token.balanceOf(investor)).toString();

      assert.equal(balanceTest, tokenize("100"));

      //check contract balance
      let balanceContract = (await web3.eth.getBalance(coinTrader.address)).toString();

      assert.equal(balanceContract, tokenize("1"));

    });
  });


  // Testing for selling
  describe("Check sale", async () => {
    it("Testing for selling coins", async () => {
      // purchasing process
      await token.approve(coinTrader.address, tokenize("50"), {from: investor});
      let result = await coinTrader.sell(tokenize("50"), {from: investor});
      
      //check balance of 
      let balanceTest = (await token.balanceOf(investor)).toString();

      assert.equal(balanceTest, tokenize("50"));

      // check contract balance
      let balanceContract = (await web3.eth.getBalance(coinTrader.address)).toString();

      assert.equal(balanceContract, tokenize("0.5"));


      //logs
      console.log((result.logs[0].args._value).toString());

    });
  });

  // Testing for error
  describe("Check error: passing is not good (just only the second test can pass when deployed)", async () => {
    it("Testing for over-spending", async () => {
      // purchasing process
      let result = await coinTrader.purchase({from: tester2, value: tokenize("200")});

    });

    it("Testing for lacking of token of bookie", async () => {
      // purchasing process
      let result = await coinTrader.purchase({from: tester2, value: tokenize("20")});

    });

    it("Testing for over-selling", async () => {
      // purchasing process
      let result = await coinTrader.sell(tokenize("60") ,{from: tester2});

    });

    it("Testing for lacking of tokens of bookie", async () => {
      // transfer to tester2 a little bit token
      await token.transfer(tester2, tokenize("100"), {from: coinTrader.address});
      // collect when bookie is lacking of tokes
      let result = await coinTrader.sell(tokenize("1000"), {from: tester2});
      

    });
  });

});