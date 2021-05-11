import React, { Component } from 'react';
import './style.css';
import Web3 from "web3";

class WithdrawForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      output: "",
    }
  }
  etherize(value){
    let web3 = new Web3();
    return web3.utils.fromWei(value, "ether");
  }
  tokenize(value){
    let web3 = new Web3();
    return web3.utils.toWei(value, "ether");
  }

  render() {
    return(
      <div className="tab-pane fade" id="sell-form" role="tabpanel" aria-labelledby="profile-tab">
        <div className="err-msg" id="msg-invest">
          
        </div>
        <form action="" method="post" onSubmit={(event) => {
          // variables
          event.preventDefault();
          const form = event.target;
          const input = form.querySelector("#token-sell-amount");
          let inputValue = input.value;
          const errQuery = form.parentElement.querySelector(".err-msg");

          // validate
          let errMsg = undefined;
          if(!inputValue){
            errMsg = "Ôi bạn ơi, nhập số lượng đi bạn ơi!";
          }
          else if(parseFloat(inputValue) <= 0){
            errMsg = "Ôi bạn ơi, bạn phải nạp nhiều hơn 0 bạn ơi!";
          }
          else if(parseFloat(inputValue) > this.etherize(this.props.token)){
            errMsg = "Ôi bạn ơi, bạn không nhiều xèng vậy đâu bạn ơi!";
          }
          else if(parseFloat(inputValue) / 100 > this.etherize(this.props.contractEth)){
            errMsg = "Ôi bạn ơi, nhà cái hết xèng rồi bạn ơi!"
          }


          // render err
          if (errMsg && errMsg !==""){
            if(errQuery){
              errQuery.innerHTML = 
              `<div class="alert alert-danger alert-dismissible show fade mt-2" role="alert">
                <span>${errMsg}</span>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>`;

            }
            else{
              alert(errMsg);
            }
          }
          // transact
          else{
            this.props.sell(this.tokenize(inputValue));
          }
        } 
        }>
          <div className="form-group mt-2">
            <label htmlFor="token-sell-amount" className="font-weight-bold">Xèng</label>
            <input type="number" onChange={(e) => {
              let value = parseFloat(e.target.value);
              if (value > 0){
                this.setState({output: (value / 100) + " eth"});
              }
              else{
                this.setState({output: ""})
              }
            }} className="form-control" id="token-sell-amount"/>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="gain" className="font-weight-bold">Bạn nhận được</label>
            <input type="text" disabled className="form-control" id="gain" value={this.state.output}/>
          </div>
          <div className="form-group mt-2">
            <input type="submit" value="Bán ngay" className="d-block form-control btn btn-outline-success"/>
          </div>
        </form>
      </div>
    );
  }
}

export default WithdrawForm;
