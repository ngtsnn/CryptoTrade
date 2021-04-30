import React, { Component } from 'react';
import './style.css';
import Web3 from "web3";
import InvestForm from "../invest-form";
import WithdrawForm from "../withdraw-form";
import PurchaseForm from "../purchase-form";
import SellForm from "../sell-form";

class BetCard extends Component {

  etherize(value){
    let web3 = new Web3();
    return web3.utils.fromWei(value, "ether");
  }

  render() {

    let adminBlock;
    if (this.props.parentState.account){
      if (this.props.parentState.account === this.props.parentState.admin){
        adminBlock =
        <div className="admin-block">
          <h2>Quản lí ví nhà cái</h2>
          <div className="border-block">
            <div className="small-title font-weight-bold">Ví nhà cái còn:</div>
            <div className="">{this.etherize(this.props.parentState.contractTokenBalance)} xèng</div>
            <div className="">{this.etherize(this.props.parentState.contractEthBalance)} eth</div>
          </div>
          <ul className="nav nav-tabs mt-2" id="admin-finance-tabs" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="buy-token-tab" data-toggle="tab" href="#invest-form" role="tab" aria-controls="buy-form" aria-selected="true">Đầu tư</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="sell-token-tab" data-toggle="tab" href="#withdraw-form" role="tab" aria-controls="sell-form" aria-selected="false">Thu hồi</a>
            </li>
          </ul>
          <div className="tab-content" id="admin-block-content">
            <InvestForm 
                eth={this.props.parentState.ethBalance}
                contractEth={this.props.parentState.contractEthBalance}
                invest={this.props.invest}
              ></InvestForm>
            <WithdrawForm
                eth={this.props.parentState.ethBalance}
                contractEth={this.props.parentState.contractEthBalance}
                withdraw={this.props.withdraw}
              ></WithdrawForm>
          </div>
          <div className="gap-md"></div>
        </div>
      }
    }
    else{
      adminBlock = "";
    }

    return(
      <section className="trade section">

        {adminBlock}


        <div className="token-trade-section">
          <h2>Đổi xèng</h2>
          <div className="border-block">
            <div className="small-title font-weight-bold">
              Tài khoản của bạn: {this.props.parentState.account === this.props.parentState.admin ? "Nhà cái" : "Người chơi"}
            </div>
            <div className="">
              {this.etherize(this.props.parentState.tokenBalance)} xèng
            </div>
            <div className="">
              {this.etherize(this.props.parentState.ethBalance)} eth
            </div>
          </div>
          <ul className="nav nav-tabs mt-2" id="trade-tabs" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="buy-token-tab" data-toggle="tab" href="#buy-form" role="tab" aria-controls="buy-form" aria-selected="true">Mua xèng</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="sell-token-tab" data-toggle="tab" href="#sell-form" role="tab" aria-controls="sell-form" aria-selected="false">Bán xèng</a>
            </li>
          </ul>
          <div className="tab-content" id="tokens-block-content">
            <PurchaseForm 
            eth={this.props.parentState.ethBalance}
            contractToken={this.props.parentState.contractTokenBalance}
            purchase={this.props.purchase}
              >
            </PurchaseForm>
            <SellForm 
            token={this.props.parentState.tokenBalance}
            contractEth={this.props.parentState.contractEthBalance}
            sell={this.props.sell}
              ></SellForm>
          </div>
        </div>


      </section>
    );
  }
}

export default BetCard;
