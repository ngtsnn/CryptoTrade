import React, { Component } from 'react';
import Identicon from 'identicon.js'
import './style.css';

class NavBar extends Component {


  render() {
    return (
      <section className="nav-section">
        <div className="container">
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-sm-3 col-md-2 mr-auto d-block" href="http://www.dappuniversity.com/bootcamp" target="_blank" rel="noopener noreferrer">
              Bầu cua 4.0
            </a>
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small className="text-secondary">
                  <small id="account">{this.props.account}</small>
                </small>
                <img className="ml-2" width="30" height="30" src={this.props.account ? "data:image/png;base64, " + new Identicon(this.props.account, 420).toString() : ""} alt=""></img>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    );
  }
}

export default NavBar;
