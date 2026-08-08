## 🏗️ Technical Architecture (Dual-Chain Ready)

This protocol is architected for a **dual-chain settlement layer**, combining the reach of EVM with the utility of Pi Network.

*   **Core Logic & Auction Contracts:** Built in **Solidity** and designed to be deployed on any **Ethereum Virtual Machine (EVM)** chain (e.g., Ethereum, Polygon). This ensures global accessibility and compatibility with the Ethereum ecosystem's tools and funding (e.g., Ethereum Foundation grants).
*   **Settlement Layer (Hybrid Engine):** The atomic split payment logic is designed to trigger two parallel settlement paths:
    1.  **Pi Network Settlement:** Interfaces with the **Pi Network SDK** (via a secure bridge or oracle) to execute the Pi coin transfer based on the GCV.
    2.  **YER Token Settlement:** Directly interacts with the `BIGISH-YER` smart contract to execute the YER token transfer on the EVM chain.
*   **Compliance with Pi Core Team Mandates:** The protocol's design adheres to the Pi Network's core principles:
    *   **KYC-Enforced Participation:** Access to the auction platform for both buyers and suppliers is strictly gated through **Pi SDK Authentication**, ensuring only verified Pioneers can participate.
    *   **Utility-Driven Value:** By embedding the **Global Consensus Value (GCV)** as a cornerstone of the settlement logic, the protocol actively contributes to establishing Pi's real-world utility, a key goal of the Pi Core Team.
*   **Identity Layer:** Utilizes **Decentralized Identity (DID)** standards, with the Pi SDK acting as a primary identity provider for verified users.