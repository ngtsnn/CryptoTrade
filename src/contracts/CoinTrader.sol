pragma solidity ^0.5.0;

import "./Token.sol";

contract CoinTrader{
  string public name = "Coin trader";
  Token public token;
  uint public rate = 100;

  // events
  event TokenPurchases(
    address indexed _from,
    address indexed _to,
    uint256 _value,
    uint256 _ethValue
  );
  event TokenSales(
    address indexed _from,
    address indexed _to,
    uint256 _value,
    uint256 _ethValue
  );

  constructor (Token _token) public {
    token = _token;
  }

  function purchase () public payable {

    // calculate value
    uint amount = msg.value * rate;

    emit TokenPurchases(msg.sender, address(this), amount, msg.value);
    // transfer
    token.transfer(msg.sender, amount);
  }

  function sell (uint _amount) public {
    // calculate value
    uint etherAmount = _amount / rate;

    emit TokenSales(msg.sender, address(this), _amount, etherAmount);
    // transfer
    token.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(etherAmount);
  }

}