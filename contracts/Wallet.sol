// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./TransferHelper.sol";
import "./ExchangeModerator.sol";

contract Wallet {
    ExchangeModerator target = ExchangeModerator(exchange);

    address payable private immutable owner;
    address payable private exchange;
    uint256 private immutable minimumAmount;

    constructor(address _exchange, uint256 _minimumAmount) {
        owner = payable(msg.sender);
        exchange = payable(_exchange);
        minimumAmount = _minimumAmount;
    }

    receive() external payable {}

    function depositERC20(address token, uint256 amount) external payable {
        TransferHelper.safeTransferFrom(token, msg.sender, address(this), amount);
    }

    function withdraw(uint _amount) external {
        require(msg.sender == owner, "caller is not owner");
        payable(msg.sender).transfer(_amount);
    }

    function transfer(address to, uint256 amount) external {
        require(amount > balance() && amount > minimumAmount, "Insufficient balance");
        (bool success,) = to.call{value: amount}("");
        require(success, "Transaction failed");
    }

    function depositToExchangeRequest(uint256 amount) external {
        require(amount > balance() && amount > minimumAmount, "Insufficient balance");
        target.depositToExchangeRequest{value: amount}(msg.sender);
    }
      function withdrawFromExchangeRequest(uint256 amount) external {
        require(amount > balance() && amount > minimumAmount, "Insufficient balance");
        target.withdrawFromExchangeRequest(msg.sender, amount);
    }


    function balance() public view returns (uint256) {
        return address(this).balance;
    }


}
