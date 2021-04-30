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
            <div className="err-msg" id="err-playing">
              <div className="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                <span>Ôi bạn ơi bạn không có tiền thì chơi ít thôi bạn ơi</span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>

            <div className="row">
              {/* bet card */}
              {this.state.bets.map(bet => <BetCard img={bet} id={bet} key={bet}></BetCard>)}
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
