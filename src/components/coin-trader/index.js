import React, { Component } from 'react';
import './style.css';


class BetCard extends Component {

  // MyTab(){
  //   const navsArr = document.querySelectorAll(".nav-tabs");
  //   navsArr.forEach((navs) => {
  //     let tabs = navs.querySelectorAll(".nav-link");
  //     tabs.forEach((tab) => {
  //       tab.addEventListener((e) => {
  //         e.preventDefault();
  //         if (!tab.classList.contains("active")){
  //           tab.classList.toggle("active");
  //           alert("chuyen tab");
  //         }
            

  //       })
  //     })
  //   })
  // }

  render() {
    return(
      <section className="trade section">
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
                <input type="submit" value="Mua ngay" className="d-block form-control btn btn-outline-success"/>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default BetCard;
