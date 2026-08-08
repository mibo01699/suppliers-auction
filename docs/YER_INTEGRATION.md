# YER Token Integration with BIGISH-YER

This document describes the technical integration between the Global Auction Protocol (GAP) and the `BIGISH-YER` system to execute the YER portion of the atomic split payment.

## 1. Architecture Overview

The `Auction.sol` smart contract will interface with the `BIGISH-YER` system through a **defined interface**. The YER token is managed by the `YERToken` smart contract, which is part of the `BIGISH-YER` ecosystem (hosted on an EVM-compatible chain). The integration follows a **pull-based pattern**.

## 2. The Atomic Settlement Flow (YER Component)

1.  **Auction Finalization:** The `Auction.sol` contract confirms the winning bid and calculates the YER amount based on the agreed split and price.
2.  **YER Transfer Request:** The contract calls a pre-approved function (e.g., `transferFrom`) on the `YERToken` interface, instructing it to transfer the YER amount from the Buyer's YER wallet to the Supplier's YER wallet.
3.  **Allowance Check:** The buyer must have previously granted an **allowance** to the `Auction.sol` contract, approving it to spend the required YER tokens on their behalf.
4.  **Atomicity and Confirmation:** The YER transfer is executed directly on the EVM chain. The auction is marked as fully settled only after both the Pi transfer confirmation (via bridge/oracle) and the YER transfer receipt are recorded.

## 3. Smart Contract Interaction (Pseudo-code)

```solidity
// Auction.sol (Simplified example)
interface IYERToken {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

contract Auction {
    IYERToken public yerToken = IYERToken(YER_TOKEN_ADDRESS);

    function settleAuction(uint256 auctionId) internal {
        // ... (calculate piAmount and yerAmount) ...
        
        // Execute YER transfer
        require(yerToken.transferFrom(buyer, supplier, yerAmount), "YER transfer failed");
        
        // ... (trigger Pi transfer via bridge/oracle) ...
    }
}