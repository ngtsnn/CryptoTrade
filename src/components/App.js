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
      account: '',
      balance: ''
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
    const ethBalance = await web3.eth.getBalance(accounts[0]);
    
    const user = {
      account: accounts[0],
      ethBalance,
      admin: process.env.REACT_APP_ADMIN || "0xAD13bb906dfE2ec9995f73c601e51aF4722988b8",
    }

    //get deployed token instance
    const network = await web3.eth.net.getId();
    const tokenData = TokenContract.networks[network];
    if (tokenData){
      const token = await web3.eth.Contract(TokenContract.abi, tokenData.address);
      user.token = token;
      let tokenBalance =  await token.methods.balanceOf(user.account).call();
      // console.log(contractBalance.toString());
      user.tokenBalance = tokenBalance.toString();
    }
    else{
      alert("Ôi bạn ơi, bạn chưa deploy trên network đó đó bạn ơi");
    }


    //get deployed cointrader instance
    const coinTraderData = CoinTraderContract.networks[network];
    if (tokenData && coinTraderData){
      const coinTrader = await web3.eth.Contract(CoinTraderContract.abi, coinTraderData.address)
      user.coinTrader = coinTrader;
      user.loaded = true;
      let contractBalance = await user.token.methods.balanceOf(coinTraderData.address).call();
      console.log(contractBalance.toString());
    }
    else{
      alert("Ôi bạn ơi, bạn chưa deploy trên network đó đó bạn ơi");
    }

    this.setState(user);
    console.log(this.state);
  }

  async LoadDataFrequently(){
    if(!this.state.loaded){
      return;
    }
    let web3_1 = window.web3;
    let [updatedAccount] = await web3_1.eth.getAccounts();
    if (updatedAccount !== this.state.account){
      let ethBalance = await web3_1.eth.getBalance(updatedAccount);
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
                <CoinTrader account={this.state.account} ethBalance={this.state.ethBalance} tokenBalance={this.state.tokenBalance} admin={this.state.admin}></CoinTrader>
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
