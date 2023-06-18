// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExchangeModerator is Ownable,ReentrancyGuard {

    event WithdrawFromExchangeRequest(address to, uint256 amount);
    event DepositToExchangeRequest(address from, uint256 amount);

    address payable owner;

    constructor() {
    }

    mapping (address => uint256) private balances;

    function withdrawFromExchangeRequest(address to) external payable{
        emit WithdrawFromExchangeRequest(to, msg.value);
    }

    function depositToExchangeRequest(address from) external payable{
        emit WithdrawFromExchangeRequest(from, msg.value);
    }

}