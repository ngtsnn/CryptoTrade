import React, { Component } from 'react';
import './style.css';


class BetCard extends Component {

  render() {
    return(
      <div className="col-lg-4 col-md-6 pb-3">
        <div className="card">
          <img src={this.props.img} alt="" className="img-card-top"/>
          <div className="card-body">
            <div className="form-group">
            <select className="form-control" id={this.props.id}>
              <option value="0">-- Nhiêu xèng nè --</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BetCard;
