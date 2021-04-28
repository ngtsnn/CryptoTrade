import React, { Component } from 'react';
import './style.css';
import BetCard from '../bet';
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
    }
  }

  render() {
    return(
      <section id="game">
        <div className="container-fluid">
          <form action="" method="POST">
            <div className="row">
              {/* bet card */}
              {this.state.bets.map(bet => <BetCard img={bet} id={bet}></BetCard>)}
            </div>
            

            {/* submit bet */}
            <input type="submit" value="Cược luôn" className="d-block m-auto form-control col-lg-2 col-md-6 btn btn-outline-success"/>
          </form>
        </div>
      </section>
    );
  }
}

export default GameController;
