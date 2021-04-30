import React, { Component } from 'react';
import './style.css';
import Web3 from "web3";

class BetCard extends Component {

  tokenize(value){
    let web3 = new Web3();
    return web3.utils.fromWei(value, "ether");
  }

  Submit = function(event){
    event.preventDefault();
    alert("submit");
    console.log(event.target);
  }

  Validate = function(errTag ,formTags){
    console.log("errTag: ", errTag);
    console.log("errTag: ", errTag);
    let msg = [];
    return msg;
  }

  render() {

    let adminBlock;
    if (this.props.account){
      if (this.props.account === this.props.admin){
        adminBlock =
        <div className="admin-block">
          <h2>Quản lí ví nhà cái</h2>
          <ul className="nav nav-tabs" id="admin-finance-tabs" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="buy-token-tab" data-toggle="tab" href="#invest-form" role="tab" aria-controls="buy-form" aria-selected="true">Đầu tư</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="sell-token-tab" data-toggle="tab" href="#withdraw-form" role="tab" aria-controls="sell-form" aria-selected="false">Thu hồi</a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="invest-form" role="tabpanel" aria-labelledby="home-tab">
              <div className="err-msg">
                <div class="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                  <span>Ôi bạn ơi bạn hết eth để nạp vào nhà cái rồi</span>
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <form action="" method="post" onSubmit={this.Submit}>
                <div className="form-group mt-2">
                  <label htmlFor="invested-eth-amount" className="font-weight-bold">ETH</label>
                  <input type="number" min="0" className="form-control" id="invested-eth-amount"/>
                </div>
                <div className="form-group mt-2">
                  <input type="submit" value="Nạp ngay" className="d-block form-control btn btn-outline-success"/>
                </div>
              </form>
            </div>
            <div className="tab-pane fade" id="withdraw-form" role="tabpanel" aria-labelledby="profile-tab">
              <form action="" method="post">
                <div className="form-group mt-2">
                  <label htmlFor="withdraw-eth-amount" className="font-weight-bold">Xèng</label>
                  <input type="number" min="0" className="form-control" id="withdraw-eth-amount"/>
                </div>
                <div className="form-group mt-2">
                  <input type="submit" value="Rút ngay" className="d-block form-control btn btn-outline-success"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    }
    else{
      adminBlock = "";
    }

    return(
      <section className="trade section">

        <div className="border-block">
          <div className="small-title font-weight-bold">
            Tài khoản của bạn: {this.props.account === this.props.admin ? "Nhà cái" : "Khách"}
          </div>
          <div className="">
            {this.tokenize(this.props.tokenBalance)} xèng
          </div>
          <div className="">
            {this.tokenize(this.props.ethBalance)} eth
          </div>
        </div>


        <div className="gap-md"></div>


        {adminBlock}


        <div className="gap-md"></div>



        <div className="token-trade-section">
          <h2>Đổi xèng</h2>
          <ul className="nav nav-tabs" id="trade-tabs" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="buy-token-tab" data-toggle="tab" href="#buy-form" role="tab" aria-controls="buy-form" aria-selected="true">Mua xèng</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="sell-token-tab" data-toggle="tab" href="#sell-form" role="tab" aria-controls="sell-form" aria-selected="false">Bán xèng</a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="buy-form" role="tabpanel" aria-labelledby="home-tab">
              <div className="err-msg">
                <div class="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                  <span>Ôi bạn ơi bạn không có tiền thì chơi ít thôi bạn ơi</span>
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <form action="" method="post">
                <div className="form-group mt-2">
                  <label htmlFor="token-amount" className="font-weight-bold">Xèng</label>
                  <input type="number" min="0" className="form-control" id="token-amount"/>
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="cost" className="font-weight-bold">Bạn sẽ mất</label>
                  <input type="number" min="0" disabled className="form-control" id="cost"/>
                </div>
                <div className="form-group mt-2">
                  <input type="submit" value="Mua ngay" className="d-block form-control btn btn-outline-success"/>
                </div>
              </form>
            </div>
            <div className="tab-pane fade" id="sell-form" role="tabpanel" aria-labelledby="profile-tab">
              <form action="" method="post">
                <div className="form-group mt-2">
                  <label htmlFor="token-sell-amount" className="font-weight-bold">Xèng</label>
                  <input type="number" min="0" className="form-control" id="token-sell-amount"/>
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="gain" className="font-weight-bold">Bạn nhận được</label>
                  <input type="number" min="0" disabled className="form-control" id="gain"/>
                </div>
                <div className="form-group mt-2">
                  <input type="submit" value="Bán ngay" className="d-block form-control btn btn-outline-success"/>
                </div>
              </form>
            </div>
          </div>
        </div>


      </section>
    );
  }
}

export default BetCard;
