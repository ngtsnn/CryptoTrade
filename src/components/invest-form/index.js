import React, { Component } from 'react';
import './style.css';
import Web3 from "web3";

class InvestForm extends Component {

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
      <div className="tab-pane show fade active" id="invest-form" role="tabpanel" aria-labelledby="home-tab">
        <div className="err-msg" id="msg-invest">
          
        </div>
        <form action="" method="post" onSubmit={(event) => {
          // variables
          event.preventDefault();
          const form = event.target;
          const input = form.querySelector("#invested-eth-amount");
          let inputValue = input.value;
          console.log(inputValue);
          const errQuery = form.parentElement.querySelector(".err-msg");

          // validate
          let errMsg = undefined;
          if(!inputValue){
            errMsg = "Ôi bạn ơi, nhập số lượng đi bạn ơi!";
          }
          else if(parseFloat(inputValue) <= 0){
            errMsg = "Ôi bạn ơi, bạn phải nạp nhiều hơn 0 bạn ơi!";
          }
          else if(parseFloat(inputValue) > this.etherize(this.props.eth)){
            errMsg = "Ôi bạn ơi, bạn không đủ eth bạn ơi!";
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
            this.props.invest(this.tokenize(inputValue));
          }
        } 
        }>
          <div className="form-group mt-2">
            <label htmlFor="invested-eth-amount" className="font-weight-bold">ETH</label>
            <input type="number" className="form-control" id="invested-eth-amount"/>
          </div>
          <div className="form-group mt-2">
            <input type="submit" value="Nạp ngay" className="d-block form-control btn btn-outline-success"/>
          </div>
        </form>
      </div>
    );
  }
}

export default InvestForm;
