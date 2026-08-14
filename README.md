# 🌐 The Decentralized Sovereign Trade Ecosystem (Yemen 2026)
## Core System Architecture & Multi-Repository Integration Guide

This integrated public good framework is designed to operate seamlessly within the **Pi Network Layer 1 (Protocol 26)** sandbox environment. It completely eradicates floating-point vulnerabilities (`BigInt` space) and empowers pioneers with total peer-to-peer economic liberty through flexible, mutually agreed-upon payment ratios tied to the **Global Consensus Value (GCV)**.

### 🏗️ Ecosystem Topology & Inter-Connectivity

يُرجى استخدام الرمز البرمجي بحذر.[1. Procurement & Bidding]             [2. Financial Settlement Layer]suppliers-auction                         BIGISH-YER (Core Rail)│                                            │▼ (Custom Pi/YER Ratios)                     ▼ (Flexible Clearing Engine)[3. Humanitarian & Vouchers]           [4. Retail POS & Supply Chain Logs]AJYAL Platform                        GAV - The Incense Route
---

### 🛠️ Local Setup & Orchestration Sequence

To execute the entire multi-application framework locally, boot the microservices in the exact sequence specified below:

#### Phase 1: Fire up the Monetary Center (`BIGISH-YER`)
The core clearing house must be initialized first to process distributed sub-unit ledgers.
```bash
cd BIGISH-YER
npm install
node server.js # Runs on Port 3000
```

#### Phase 2: Launch the Educational & Voucher Gateway (`AJYAL`)
Establishes user profiles mapped via Pi Authentication SDK hooks and handles donor-focused grant controls.
```bash
cd ../AJYAL
npm install
node server.js # Runs on Port 4000
```

#### Phase 3: Initiate the Provenance & Point-of-Sale Engine (`GAV-The-Incense-Route`)
Manages agricultural logistics tracking and executes physical aid basket redemptions at retail counters.
```bash
cd ../GAV-The-Incense-Route
npm install
node index.js # Runs on Port 8080
```

#### Phase 4: Deploy the Reverse-Auction Portal (`suppliers-auction`)
The transaction entry node where suppliers and institutional buyers bid and finalize contract criteria.
```bash
cd ../suppliers-auction
npm install
export BIGISH_YER_API="http://localhost:3000"
npm start # Runs on Port 5000
```

---

### 🔒 Operational Mandate for Future Mainnet Integration
1. **Passphrase Safety:** No application file contains or harvests user passphrases. All payments trigger frontend UI modals via `Pi.createPayment()`.
2. **Flexible P2P Ratios:** Never enforce

