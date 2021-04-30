pragma solidity ^0.5.0;

import "./Token.sol";

contract CoinTrader{
  string public name = "Coin trader";
  Token public token;
  uint public rate = 100;
  address payable admin;


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
  event BookieTransaction(
    address indexed _admin,
    address indexed _contract,
    uint256 _ethVal,
    string typeTransaction
  );

  constructor (Token _token, address payable _admin) public {
    token = _token;
    admin = _admin;
  }

  function adminInfo () public view returns (address){
    return admin;
  }

  function purchase () public payable {

    // calculate value
    uint amount = msg.value * rate;

    //check bookie have enought tokens or not
    require(token.balanceOf(address(this)) >= amount);
    //check seller have enough ether to buy
    require(msg.sender.balance >= msg.value);

    emit TokenPurchases(msg.sender, address(this), amount, msg.value);
    // transfer
    token.transfer(msg.sender, amount);
  }

  function sell (uint _amount) public {
    // calculate value
    uint etherAmount = _amount / rate;

    //check bookie have enough tokens or not
    require((address(this).balance) >= etherAmount);
    //check seller have enough tokens to sell
    require(token.balanceOf(msg.sender) >= _amount);

    emit TokenSales(msg.sender, address(this), _amount, etherAmount);
    // transfer
    token.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(etherAmount);
  }

  function invest() public payable {

    // check bookie call this function or not
    require(msg.sender == admin);
    // check bookie have no financial problem
    require(msg.sender.balance >= msg.value);

    emit BookieTransaction(admin, address(this), msg.value, "Investment");
  }

  function withdraw(uint256 _amount) public {

    // check bookie call this function or not
    require(msg.sender == admin);
    // check deployed contract has enough eth
    require(address(this).balance >= _amount);

    admin.transfer(_amount);

  }

}