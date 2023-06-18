// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./PolygonWalletsManager.sol";

contract ExchangePool {

PolygonWalletsManager target = PolygonWalletsManager(walletsManager);

address payable private walletsManager;
constructor (address _walletsManager) {
    walletsManager = payable(_walletsManager);
}

function payWithdrawal (address to) payable external {
    target.withdrawSucceed{value: msg.value}(to);
}


}