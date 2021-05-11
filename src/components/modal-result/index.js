import React, { Component } from 'react';
import './style.css';
import cop from "../../img/1-cop.jpg";
import bau from "../../img/2-bau.jpg";
import ga from "../../img/3-ga.jpg";
import tom from "../../img/4-tom.jpg";
import ca from "../../img/5-ca.jpg";
import cua from "../../img/6-cua.jpg";
import plate from "../../img/dish.png";
import lid from "../../img/lid-2.png";

class GameController extends Component {

  constructor(props){
    super(props);
    this.state = {
      bets: [cop, bau, ga, tom, ca, cua],
    }
  }

  render() {
    let results;
    if(this.props.results){
      results = this.props.results.map(result => this.props.results.map((result, index) => <div key={index} className="result-img">
      <img src={result} alt=""/>
    </div>))
    }
    else{
      results = "";
    }

    return(
      <div id="result-modal" className="my-modal">
        <div className="dark-layer vw100 vh100"></div>

        <div className="my-modal-body">
          
          <div className="result-container position-relative">
            <div className="dish">
              <img src={plate} alt=""/>
              {results}
            </div>
            <div className="lid open">
              <img src={lid} alt=""/>
            </div>
          </div>
        

          <div className="total d-flex justify-content-between align-items-center">
            <div className="total-text"> Bạn nhận được: {this.props.reward} xèng </div>
            <button type="button" className="d-block btn btn-outline-success" modal-close="#result-modal" onClick={(event => {
              event.preventDefault();
              let btn = event.target;
              let closedModal = document.querySelector(btn.getAttribute("modal-close"));
              closedModal.classList.remove("show");
            })}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GameController;
