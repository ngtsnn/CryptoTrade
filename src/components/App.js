import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import NavBar from './nav';
import Game from './game';
import CoinTrader from './coin-trader';
import TokenContract from '../abis/Token.json';
import CoinTraderContract from '../abis/CoinTrader.json';
import dotenv from "dotenv"
import loading from "../img/Cat_loading.gif"
//require('dotenv').config({ path: '../env/.env'});

dotenv.config()

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      account: undefined,
      admin: undefined,
      ethBalance: undefined,
      tokenBalance: undefined,
      token: undefined,
      coinTrader: undefined,
      tokenAddress: undefined,
      coinTraderAddress: undefined,
      contractEthBalance: undefined,
      contractTokenBalance: undefined,
      loaded: false
    }
  }

  //Doing with Web3
  async componentWillMount(){
    await this.LoadWeb3();
    await this.LoadData();
  }

  async componentDidMount(){
    setInterval(async () => await this.LoadDataFrequently(), 200);
  }

  async LoadWeb3 (){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else{
      window.alert("Ôi bạn ơi, bạn chưa cài metamask kìa");
    }
  }

  async LoadData(){
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const ethBalance = (await web3.eth.getBalance(accounts[0])).toString();
    
    const user = {
      account: accounts[0],
      ethBalance,
    }

    this.setState(user)

    //get deployed token instance
    const network = await web3.eth.net.getId();
    const tokenData = TokenContract.networks[network];
    if (tokenData){
      let token = await web3.eth.Contract(TokenContract.abi, tokenData.address);
      let tokenBalance =  await token.methods.balanceOf(user.account).call();
      // console.log(contractBalance.toString());
      tokenBalance = tokenBalance.toString();
      this.setState({tokenBalance, token, tokenAddress: tokenData.address})
    }
    else{
      alert("Ôi bạn ơi, bạn chưa deploy trên network đó đó bạn ơi");
    }


    //get deployed cointrader instance
    const coinTraderData = CoinTraderContract.networks[network];
    if (tokenData && coinTraderData){
      const coinTrader = await web3.eth.Contract(CoinTraderContract.abi, coinTraderData.address);
      let token = this.state.token;
      let contractTokenBalance = (await token.methods.balanceOf(coinTraderData.address).call()).toString();
      let contractEthBalance = (await web3.eth.getBalance(coinTraderData.address)).toString();
      let admin = await coinTrader.methods.adminInfo().call();
      this.setState({admin: admin || "0xAD13bb906dfE2ec9995f73c601e51aF4722988b8",
        coinTrader,
        contractEthBalance,
        contractTokenBalance,
        loaded: true,
        coinTraderAddress: coinTraderData.address,
      });
      
    }
    else{
      alert("Ôi bạn ơi, bạn chưa deploy trên network đó đó bạn ơi");
    }

    console.log(this.state);
  }

  async LoadDataFrequently(){
    if(!this.state.loaded){
      return;
    }
    let web3_1 = window.web3;
    let [updatedAccount] = await web3_1.eth.getAccounts();
    if (updatedAccount !== this.state.account){
      let ethBalance = (await web3_1.eth.getBalance(updatedAccount)).toString();
      let tokenBalance = (await this.state.token.methods.balanceOf(updatedAccount).call()).toString();
      console.log("updated account:" , {
        updatedAccount,
        ethBalance,
        tokenBalance,
      });
      this.setState({
        account: updatedAccount,
        ethBalance,
        tokenBalance,
      })
    }
    this.updateBalance();
  }

  async updateBalance() {
    let contractEthBalance = (await window.web3.eth.getBalance(this.state.coinTraderAddress)).toString();
    let ethBalance = (await window.web3.eth.getBalance(this.state.account)).toString();
    let contractTokenBalance = (await this.state.token.methods.balanceOf(this.state.coinTraderAddress).call()).toString();
    let tokenBalance = (await this.state.token.methods.balanceOf(this.state.account).call()).toString();
    this.setState({
      contractTokenBalance,
      ethBalance,
      contractEthBalance,
      tokenBalance,
    })
  }


  // transaction functions
  purchase = async (_amount) => {
    let state = this.state;
    this.setState({loaded: false});

    if (!state.token || !state.coinTrader){
      this.setState({loaded: true});
      return;
    }

    state.coinTrader.methods.purchase().send({from: state.account, value: _amount}).on("transactionHash", (hash)=>{
      this.setState({loaded: true});
    });
  }
  sell = async (_amount) => {
    let state = this.state;
    this.setState({loaded: false});

    if (!state.token || !state.coinTrader){
      this.setState({loaded: true});
      return;
    }

    state.token.methods.approve(this.state.coinTraderAddress, _amount).send({from: state.account}).on("transactionHash", (hash)=>{

    });
    state.coinTrader.methods.sell(_amount).send({from: state.account}).on("transactionHash", (hash)=>{
      this.setState({loaded: true});
    });
  }
  invest = async (_amount) => {
    let state = this.state;
    this.setState({loaded: false});

    if (!state.token || !state.coinTrader || state.account !== state.admin){
      this.setState({loaded: true});
      return;
    }

    state.coinTrader.methods.invest().send({from: state.account, value:_amount}).on("transactionHash", async (hash)=>{
      this.setState({
        loaded: true,
      });
    });
  }
  withdraw = async (_amount) => {
    let state = this.state;
    this.setState({loaded: false});

    if (!state.token || !state.coinTrader || state.account !== state.admin){
      this.setState({loaded: true});
      return;
    }

    state.coinTrader.methods.withdraw(_amount).send({from: state.account}).on("transactionHash", (hash)=>{
      this.setState({loaded: true});
    });
  }


  render() {
    let mainContent
    if (this.state.loaded){
      mainContent = 
      <div>
        <NavBar account={this.state.account}></NavBar>
        <main className="main-app mb-5">
          <div className="gap"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-9 py-3">
                <Game></Game>
              </div>
              <div className="col-lg-3 py-3">
                <CoinTrader 
                    parentState = {this.state}
                    purchase = {this.purchase}
                    sell = {this.sell}
                    invest = {this.invest}
                    withdraw = {this.withdraw}
                  >
                </CoinTrader>
              </div>
            </div>
          </div>
        </main>
      </div>;
    }
    else{
      mainContent = 
      <div className="loading-container">
        <img src={loading} alt="" className="loading"/>
      </div>
    }

    return (
      <div>
        {mainContent}
      </div>
    );
  }
}

export default App;
