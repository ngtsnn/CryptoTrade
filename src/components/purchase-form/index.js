import React, { Component } from 'react';
import './style.css';
import Web3 from "web3";

class PurchaseForm extends Component {

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
      <div className="tab-pane fade show active" id="buy-form" role="tabpanel" aria-labelledby="home-tab">
        <div className="err-msg" id="msg-invest">
          
        </div>
        <form action="" method="post" onSubmit={(event) => {
          // variables
          event.preventDefault();
          const form = event.target;
          const input = form.querySelector("#token-amount");
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
          else if(parseFloat(inputValue) / 100 > this.etherize(this.props.eth)){
            errMsg = "Ôi bạn ơi, bạn hết tiền thì nghỉ thôi bạn ơi!";
          }
          else if(parseFloat(inputValue) > this.etherize(this.props.contractToken)){
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
            this.props.purchase(this.tokenize((parseFloat(inputValue) / 100).toString()));
          }
        } 
        }>
          <div className="form-group mt-2">
            <label htmlFor="token-amount" className="font-weight-bold">Xèng</label>
            <input type="number" onChange={(e) => {
              let value = parseFloat(e.target.value);
              if (value > 0){
                this.setState({output: (value / 100) + " eth"});
              }
              else{
                this.setState({output: ""})
              }
            }} className="form-control" id="token-amount"/>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="cost" className="font-weight-bold">Bạn sẽ mất</label>
            <input type="text" disabled className="form-control" id="cost" value={this.state.output}/>
          </div>
          <div className="form-group mt-2">
            <input type="submit" value="Mua ngay" className="d-block form-control btn btn-outline-success"/>
          </div>
        </form>
      </div>
    );
  }
}

export default PurchaseForm;
