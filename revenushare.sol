// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.27;

import {IERC20} from "@openzeppelin/contracts@5.3.0/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts@5.3.0/access/Ownable.sol";

contract RevenueShare is Ownable {
    struct Stakeholder {
        address wallet;
        uint256 share; // in basis points (bps), 10000 = 100%
    }

    Stakeholder[] public stakeholders;
    IERC20 public acceptedToken; // ERC20 token for payments (optional)

    event RevenueReceived(address from, uint256 amount);
    event RevenueDistributed(uint256 totalAmount);

    constructor(address initialOwner, IERC20 _token) Ownable(initialOwner) {
        acceptedToken = _token;
    }

    // Add or update stakeholders
    function setStakeholders(address[] calldata _wallets, uint256[] calldata _shares) external onlyOwner {
        require(_wallets.length == _shares.length, "Length mismatch");
        delete stakeholders;

        uint256 totalShare;
        for (uint256 i = 0; i < _wallets.length; i++) {
            stakeholders.push(Stakeholder({wallet: _wallets[i], share: _shares[i]}));
            totalShare += _shares[i];
        }
        require(totalShare == 10000, "Shares must total 100% (10000 bps)");
    }

    // Receive ETH payments
    receive() external payable {
        emit RevenueReceived(msg.sender, msg.value);
    }

    // Distribute ETH revenue to stakeholders
    function distributeETH() external {
        uint256 balance = address(this).balance;
        require(balance > 0, "No revenue to distribute");

        for (uint256 i = 0; i < stakeholders.length; i++) {
            uint256 amount = (balance * stakeholders[i].share) / 10000;
            payable(stakeholders[i].wallet).transfer(amount);
        }

        emit RevenueDistributed(balance);
    }

    // Distribute ERC20 token revenue
    function distributeToken() external {
        uint256 balance = acceptedToken.balanceOf(address(this));
        require(balance > 0, "No revenue to distribute");

        for (uint256 i = 0; i < stakeholders.length; i++) {
            uint256 amount = (balance * stakeholders[i].share) / 10000;
            acceptedToken.transfer(stakeholders[i].wallet, amount);
        }

        emit RevenueDistributed(balance);
    }
}
