import React, { Component } from 'react';
import './style.css';
import BetCard from '../bet';
import Result from '../modal-result';
import cop from "../../img/1-cop.jpg";
import bau from "../../img/2-bau.jpg";
import ga from "../../img/3-ga.jpg";
import tom from "../../img/4-tom.jpg";
import ca from "../../img/5-ca.jpg";
import cua from "../../img/6-cua.jpg";

class GameController extends Component {

  constructor(props){
    super(props);
    this.state = {
      bets: [cop, bau, ga, tom, ca, cua],
      results: undefined,
      reward: 0,
    }
  }

  componentDidMount(){
    this.renderResult();
  }

  renderResult = () =>{
    if(this.props.hasBet){
      //variables
      let results = [];
      let reward = 0;
      for (var i = 0; i < 3; i++){
        let randInt = Math.floor(Math.random() * 6)
        results.push(this.state.bets[randInt])
        reward += this.props.inputs[randInt] * 2;
      }
      // deal with reward
      reward = Math.floor(reward * .95);
      if (reward){
        setTimeout(() => {
          this.props.winPrize(this.tokenize(reward.toString()));
        }, 4000);
      }

      // set state
      this.setState({results, reward});

      // open modal
      let form = document.querySelector("#game-form")
      let modalTarget = form.getAttribute("modal-target");
      let modal = document.querySelector(modalTarget);
      modal.classList.add("show");
      this.props.unbet();
    }
    
  }

  etherize(value){
    let web3 = window.web3;
    return web3.utils.fromWei(value, "ether");
  }
  tokenize(value){
    let web3 = window.web3;
    return web3.utils.toWei(value, "ether");
  }

  render() {
    return(
      <section id="game">
        <div className="container-fluid">

          <div className="err-msg">
            
          </div>

          <form action="" method="POST" id="game-form" modal-target="#result-modal" onSubmit={(event) => {

            event.preventDefault();

            // variables
            let form = event.target;
            let inputs = form.querySelectorAll(".input-value");
            inputs = [...inputs].map(val => {
              return parseInt(val.value);
            });
            let wager = inputs.reduce((prev, curr) => prev + curr, 0);
            let errTag = form.parentNode.querySelector(".err-msg");
            let msg = "";


            // validate
            if (!wager){
              msg = "Ôi bạn ơi bạn chưa đặt kìa bạn ơi";
            }
            else if(wager > this.etherize(this.props.contractToken)){
              msg = "Ôi bạn ơi bạn quay lại lúc khác nhé, nhà cái hết tiền rồi bạn ơi";
            }
            else if(wager > this.etherize(this.props.token)){
              msg = "Ôi bạn ơi bạn hết xèng rồi thì nạp đi bạn ơi";
            }

            
            // err render
            if (msg && msg !==""){
              if(errTag){
                errTag.innerHTML = 
                `<div class="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                  <span>${msg}</span>
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>`
              }
              else{
                alert(msg);
              }
            }
            // play game
            else{

              // betting
              this.props.setInputs(inputs);
              this.props.bet(this.tokenize(wager.toString()));
              


              
            }
          }}>
            

            <div className="row">
              {/* bet card */}
              {this.state.bets.map(bet => <BetCard img={bet} id={bet} key={bet}></BetCard>)}
            </div>
            

            {/* submit bet */}
            <input type="submit" value="Cược luôn" className="d-block m-auto form-control col-lg-2 col-md-6 btn btn-outline-success"/>

            <Result 
                results={this.state.results}
                reward={this.state.reward}
              >

            </Result>
          </form>
        </div>
      </section>
    );
  }
}

export default GameController;
