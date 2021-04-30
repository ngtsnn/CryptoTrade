const Token = artifacts.require("Token");
const CoinTrader = artifacts.require("CoinTrader");

require("chai")
  .use(require("chai-as-promised"))
  .should()

const tokenize = function (ether) { 
  return web3.utils.toWei(ether, "ether");
}
const etherize = function (weight){
  return web3.utils.fromWei(weight, "ether");
}

contract("CoinTrader", ([deployer, investor, tester1, tester2]) => {

  let token, coinTrader

  // initial things
  before(async () => {
    token = await Token.new();
    coinTrader = await CoinTrader.new(token.address, tester1);
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

  // Testing for Admin
  describe("Check admin actions", async () => {
    it("Testing for invest eth", async () => {
      //get ether balance of contract before investing
      let earlierBalance = await web3.eth.getBalance(coinTrader.address); 

      //investment process (invest 3 eth)
      let result = await coinTrader.invest({from: tester1, value: tokenize("3")});

      //get ether balance of contract after investing
      let laterBalance = await web3.eth.getBalance(coinTrader.address); 

      //check 
      assert.equal(parseFloat(etherize(earlierBalance)) + 3, parseFloat(etherize(laterBalance)));
    })

    it("Testing for withdraw eth", async () => {
      //get ether balance of contract before investing
      let earlierBalance = await web3.eth.getBalance(coinTrader.address); 

      //withdrawal process (withdraw 2 eth)
      let result = await coinTrader.withdraw(tokenize("2") ,{from: tester1});

      //get ether balance of contract after investing
      let laterBalance = await web3.eth.getBalance(coinTrader.address); 

      //check
      assert.equal(parseFloat(etherize(earlierBalance)) - 2, parseFloat(etherize(laterBalance)));
    })
  })

  // Testing for error
  describe("Check error: passing is not good (just only the second test can pass when deployed)", async () => {
    it("Testing for over-spending", async () => {
      // purchasing process
      let result = await coinTrader.purchase({from: tester2, value: tokenize("200")});

    });

    // it("Testing for lacking of token of bookie", async () => {
    //   // purchasing process
    //   let result = await coinTrader.purchase({from: tester2, value: tokenize("20")});

    // });

    it("Testing for over-selling", async () => {
      // purchasing process
      await token.approve(coinTrader.address, tokenize("60"), {from: tester2});
      let result = await coinTrader.sell(tokenize("60") ,{from: tester2});

    });

    it("Testing for lacking of tokens of bookie", async () => {
      // transfer to tester2 a little bit token
      await token.transfer(tester2, tokenize("100"), {from: coinTrader.address});
      // collect when bookie is lacking of tokes
      let result = await coinTrader.sell(tokenize("1000"), {from: tester2});
      

    });


    it("Testing for investing too much by admin", async () => {
      //investment process (invest 3 eth)
      let result = await coinTrader.invest({from: tester1, value: tokenize("101")});
    })

    it("Testing for withdrawing too much by admin", async () => {
      //withdrawal process (withdraw 2 eth)
      let result = await coinTrader.withdraw(tokenize("101") ,{from: tester1});
    })
  });

});