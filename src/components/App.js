import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import NavBar from './nav';
import Game from './game';
import CoinTrader from './coin-trader';

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
    const balance = await web3.eth.getBalance(accounts[0]);
    
    const user = {
      account: accounts[0].slice(2),
      balance,
    }

    this.setState(user);
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <NavBar account={this.state.account}></NavBar>
        <main className="main-app mb-5">
          <div className="gap"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <Game></Game>
              </div>
              <div className="col-lg-3">
                <CoinTrader></CoinTrader>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
