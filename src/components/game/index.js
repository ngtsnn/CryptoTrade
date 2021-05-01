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

          <form action="" method="POST" modal-target="#result-modal" onSubmit={(event) => {

            event.preventDefault();

            // variables
            let form = event.target;
            let modalTarget = form.getAttribute("modal-target");
            let inputs = form.querySelectorAll(".input-value");
            let wager = [...inputs].reduce((prev, curr) => prev + parseInt(curr.value), 0);
            let errTag = form.parentNode.querySelector(".err-msg");
            let msg = "";

            console.log(this.props.token);

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
              let results = [];
              let reward = 0;
              for (var i = 0; i < 3; i++){
                let randInt = Math.floor(Math.random() * 6)
                results.push(this.state.bets[randInt])
                reward += parseInt(inputs[randInt].value);
              }

              // deal with reward
              reward = Math.floor(reward * .9);
              if (reward){
                setTimeout(() => {
                  this.props.winPrize(this.tokenize(reward.toString()));
                }, 4000);
              }
              else{
                setTimeout(() => {
                  this.props.loseToken(this.tokenize(wager.toString()));
                }, 4000);
              }

              // set state
              this.setState({results, reward});

              // open modal
              let modal = document.querySelector(modalTarget);
              modal.classList.add("show");
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
