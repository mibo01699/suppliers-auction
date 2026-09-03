# YER Token Integration with BIGISH-YER

**Version:** 1.0.0 (Sandbox/Testnet)

> **⚠️ Important:** This is a **sandbox/testnet-only prototype**.  
> It does **NOT** claim official certification or funding from any organization.

---

## 1. Architecture Overview

The `Auction.sol` smart contract interfaces with the `BIGISH-YER` system to execute the YER portion of the atomic split payment. The YER token is managed by the `YERToken` smart contract.

---

## 2. The Atomic Settlement Flow (YER Component)

| Step | Description |
|------|-------------|
| **1. Auction Finalization** | Contract confirms the winning bid and calculates the YER amount. |
| **2. YER Transfer Request** | Contract calls `transferFrom` on the `YERToken` interface. |
| **3. Allowance Check** | Buyer must grant allowance to the `Auction.sol` contract. |
| **4. Atomicity and Confirmation** | Auction is marked as settled only after both Pi and YER transfers are confirmed. |

---

## 3. Smart Contract Interaction (Pseudo-code)

```solidity
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

        // ... (trigger Pi transfer) ...
    }
}
```

---

4. Security Considerations

· All financial calculations must use BigInt to prevent floating-point errors.
· No private keys or sensitive data should be stored in the codebase.
· All sensitive operations must be validated on the server side.

---

🦅 Developed by Arabian Eagle Technology Group (A.E.C.)
