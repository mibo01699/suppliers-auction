# Pi Network Ecosystem Compliance Document (Updated 2026)
## Project: Sovereign Suppliers Auction Node & Integrated Ecosystem

This document certifies that the **Suppliers Auction Protocol** and its interconnected components (`BIGISH-YER`, `AJYAL`, `GAV`) conform strictly to the updated developer rules mandated by the **Pi Core Team** for Open Mainnet deployment.

### 1. Peer-to-Peer Economic Autonomy (Anti-AMM Mandate)
* **Compliance Action:** All previous code pipelines forcing fixed 50/50 splits via an automated market maker (AMM) DEX have been completely deprecated.
* **Mechanism:** The application now operates as a pure **P2P Bartering Infrastructure**. Merchants and suppliers retain absolute autonomy to negotiate and declare the precise percentage of Pi Coins (`piRatioPercentage`) they accept for transactions based on the Global Consensus Value (GCV). 

### 2. Zero Floating-Point Precision Standard
* **Compliance Action:** Eradication of IEEE 754 float models to satisfy bank-grade criteria for the Pi Network Sandbox and international donor audits.
* **Data Typings:**
  * **Pi Network Layer 1 Ledger:** Maintained strictly in Integer Space via **Stroops** ($1 \text{ Pi} = 10^7 \text{ Stroops}$).
  * **Regional Settlement Clearing:** Processed under absolute fixed-point BigInt scales at 10 Decimal Places.

### 3. Pi Browser & Closed-Ecosystem Security
* **Compliance Action:** The protocol is structurally engineered to function exclusively inside the secure **Pi Browser WebView**.
* **Identity Layer:** All platform actors (Suppliers, Humanitarian Enumerators, and Buyers) are strictly vetted through the official **Pi Authentication SDK (KYC/KYB Bound)**. No background signing or automated passphrase harvesting is possible; every cryptographic signature requires biometric or passcode authorization by the active Pioneer.
