// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./PolygonWalletsManager.sol";

contract ExchangePool {

PolygonWalletsManager target = PolygonWalletsManager(walletsManager);

address payable private walletsManager;
address private allowedAddress;

constructor (address _walletsManager, address _allowedAddress) {
    walletsManager = payable(_walletsManager);
    allowedAddress = _allowedAddress;
}

modifier allowed {
    require(msg.sender == allowedAddress, "Not allowed");
    _;
}

function payWithdrawalByAddress (address to) payable external allowed{
    // target.withdrawalSucceed(to, msg.value);
    target.deposit{value: msg.value}(to);
}

function payWithdrawalByContract(address to, uint256 amount)  external allowed{
    // target.withdrawalSucceed(to, amount);
    target.deposit{value: amount}(to);
}

receive() external payable{}

}