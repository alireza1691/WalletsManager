// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Wallet.sol";


/// @title A title that should describe the contract/interface
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details

contract ExchangeModerator is Ownable,ReentrancyGuard {

    event WithdrawFromExchangeRequest(address to, uint256 amount);
    event DepositToExchangeRequest(address from, uint256 amount);
    event NewWallet(address owner, address walletContractAddress);

    constructor() {
    }


    mapping (address => uint256) private balances;
    mapping (address => address) private userToWallet;

    function withdrawFromExchangeRequest(address to, uint256 amount) external payable{
        emit WithdrawFromExchangeRequest(to, amount);
    }

    function depositToExchangeRequest(address from) external payable{
        emit DepositToExchangeRequest(from, msg.value);
    }

    function newWallet(/*bytes32 _salt*/uint256 num) external{
        bytes32 _salt = bytes32(num);
        Wallet wallet = (new Wallet){salt: _salt}(address(this),1e19);
        userToWallet[msg.sender] = address(wallet);
        // return address(wallet);
        emit NewWallet(msg.sender, address(wallet));

    }

    function userWallet(address user) view public returns (address) {
        return userToWallet[user];
    }

    function createDSalted(bytes32 salt, uint arg) public returns(address){
        // This complicated expression just tells you how the address
        // can be pre-computed. It is just there for illustration.
        // You actually only need ``new D{salt: salt}(arg)``.
        address predictedAddress = address(uint160(uint(keccak256(abi.encodePacked(
            bytes1(0xff),
            address(this),
            salt,
            keccak256(abi.encodePacked(
                type(Wallet).creationCode,
                abi.encode(arg)
            ))
        )))));

        Wallet wallet = new Wallet{salt: salt}(address(this),1e19);
        require(address(wallet) == predictedAddress);
        return predictedAddress;
    }

}