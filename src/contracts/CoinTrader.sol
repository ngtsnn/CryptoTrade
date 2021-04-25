pragma solidity ^0.5.0;

contract CoinTrader{
  string public hello = "Hello guys";

  function SetNewString (string memory _newString) public returns (bool) {
    hello = _newString;
  }

}