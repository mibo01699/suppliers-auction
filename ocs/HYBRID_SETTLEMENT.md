# Hybrid Settlement Mechanism (Atomic Split Payment)

## Core Concept
In the Global Auction Protocol, a single winning bid triggers an **atomic transaction** that simultaneously debits two distinct wallets from the buyer's account:

1.  **Pi Wallet:** Debited with a predefined percentage of the total bid amount, calculated based on the agreed **Global Consensus Value (GCV)** at the time of the auction.
2.  **YER Wallet:** Debited with the remaining percentage of the total bid amount via the `BIGISH-YER` token system.

## The Atomic Split Process
1.  **Auction Finalization:** The smart contract (`Auction.sol`) confirms the winning bid and the agreed price.
2.  **Split Calculation:** The contract calculates the exact amounts for Pi (based on GCV) and YER, according to the buyer's predefined split ratio.
3.  **Dual-Trigger Execution:**
    *   **Pi Payment:** The contract initiates a payment request via the **Pi Network SDK** (using cross-chain messaging or an oracle) to transfer the Pi amount from the buyer's Pi wallet to the supplier's Pi wallet.
    *   **YER Payment:** Simultaneously, the contract calls the `BIGISH-YER` system's smart contract to transfer the YER amount from the buyer's YER wallet to the supplier's YER wallet.
4.  **Settlement Confirmation:** The auction is marked as complete only upon confirmation of both transfers.

## Why This Matters
This atomic split model:
- **Establishes GCV:** Creates a real-world, transparent record of Pi's value through actual trade.
- **Enables Stable Settlements:** Uses YER for the stable portion of the payment, protecting suppliers from Pi's volatility.
- **Drives Ecosystem Utility:** Forces the use of Pi and YER together, integrating the entire `BIGISH-YER` infrastructure.

## Integration Points
- **Smart Contract:** `Auction.sol` will contain the logic for split calculation and triggering the dual-payment requests.
- **Pi Network SDK:** Used to interface with Pi wallets (via bridges or oracles).
- **BIGISH-YER API/SDK:** Used to interface with the YER token system.