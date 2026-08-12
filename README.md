🏗️ Technical Architecture (Dual-Chain Ready)

This protocol is architected for a dual-chain settlement layer, combining the reach of EVM with the utility of Pi Network.

· Core Logic & Auction Contracts: Built in Solidity and designed to be deployed on any Ethereum Virtual Machine (EVM) chain (e.g., Ethereum, Polygon). This ensures global accessibility and compatibility with the Ethereum ecosystem's tools and funding (e.g., Ethereum Foundation grants).
· Settlement Layer (Hybrid Engine): The atomic split payment logic is designed to trigger two parallel settlement paths:
  1. Pi Network Settlement: Interfaces with the Pi Network SDK (via a secure bridge or oracle) to execute the Pi coin transfer based on the GCV.
  2. YER Token Settlement: Directly interacts with the BIGISH-YER smart contract to execute the YER token transfer on the EVM chain.
· Compliance with Pi Core Team Mandates: The protocol's design adheres to the Pi Network's core principles:
  · KYC-Enforced Participation: Access to the auction platform for both buyers and suppliers is strictly gated through Pi SDK Authentication, ensuring only verified Pioneers can participate.
  · Utility-Driven Value: By embedding the Global Consensus Value (GCV) as a cornerstone of the settlement logic, the protocol actively contributes to establishing Pi's real-world utility, a key goal of the Pi Core Team.
· Identity Layer: Utilizes Decentralized Identity (DID) standards, with the Pi SDK acting as a primary identity provider for verified users.

---

🖥️ Frontend Prototypes

The project includes two frontend prototypes to demonstrate core functionalities:

1. Main Dashboard (frontend/index.html): Displays active auctions and integrates a 3D shipment tracking panel powered by Leaflet.
2. Shared Tracking Link (frontend/tracking.html): A standalone tracking page with a shareable link, designed for customs officers and shipping companies.

How to Run the Frontend

Simply open the index.html or tracking.html files in your browser to explore the user interface and tracking features.

---

🔧 Backend Server

The backend server provides RESTful APIs for the application. It acts as a middleware between the frontend and the Pi Network smart contracts.

Setup and Run

1. Navigate to the backend/ folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

The server will run on http://localhost:5000.

Available APIs

· Auction:
  · POST /api/auction/create – Create a new auction.
  · POST /api/auction/bid – Place a bid.
  · POST /api/auction/finalize – Finalize an auction.
· Payment:
  · POST /api/payment/settle – Execute hybrid settlement (Pi + YER).
· Tracking:
  · POST /api/tracking/create – Create a new tracking record.
  · POST /api/tracking/add-point – Add a tracking point.
  · GET /api/tracking/:id – Get tracking information.
· KYB:
  · POST /api/kyb/register – Register a business entity.
  · POST /api/kyb/grant-role – Grant a role to a user.

---

✅ Summary of Executed Steps

1. A complete backend server has been created with APIs covering all application functionalities (auctions, payment, tracking, KYB).
2. Documentation on how to run the server and use the APIs has been included in the README.md file.
3. The foundation is now ready to connect the APIs to the actual smart contracts on the Pi Network (simulation functions will be replaced with real Pi SDK and Soroban calls).

You now have a structurally integrated application: smart contracts, frontend, and backend. 🚀

---

🚀 Deployment on Replit

This project is designed to be easily deployed and run on Replit (https://replit.com). Follow these steps:

How to Deploy

1. Create a new Repl:
   · Log in to your Replit account.
   · Click on the "Create Repl" button.
   · Choose "Import from GitHub".
   · Paste the URL of this repository: https://github.com/mibo01699/suppliers-auction.
   · Click "Import".
2. Run the application:
   · After the import completes, Replit will automatically detect the configuration.
   · Click the "Run" button at the top.
3. Access the application:
   · Once the server starts, Replit will provide a webview or a URL to access the application.
   · The backend API will be available at the provided URL (e.g., https://suppliers-auction.YOUR_USERNAME.repl.co).

Environment Variables

If needed, you can set environment variables in Replit's "Secrets" section. For this project, the default port (5000) is used.

How It Works

· Frontend: The frontend/index.html and frontend/tracking.html files are served as static pages.
· Backend: The backend/server.js file is the main server that handles API requests.
· Smart Contracts: The Rust contracts in the contracts/ folder are for reference and future deployment on Pi Network.

Next Steps

After deployment on Replit, the application can be integrated with Pi SDK via the Pi App Studio to enable real blockchain interactions.

---

💱 Hybrid Payment Integration with BIGISH-YER

The auction application relies on the hybrid payment system (Pi + YER) through integration with the BIGISH-YER server.

How to Run

1. Ensure the BIGISH-YER server is running first.
2. Set the environment variable BIGISH_YER_API to point to the BIGISH-YER server address.
3. Run the auction server.
4. Use the /api/payment/settle API to execute hybrid payment, providing YER wallet IDs for both buyer and seller.

Example Payment Request

```json
POST /api/payment/settle
{
  "auctionId": "auc_123",
  "buyerPiWallet": "GABC...",
  "sellerPiWallet": "GXYZ...",
  "buyerYerWalletId": "YER-...",
  "sellerYerWalletId": "YER-...",
  "totalAmount": 100
}
```

---

✅ Final Integration Summary

Application Function Integration with BIGISH-YER
AJYAL Beneficiary and code management Via clearing system (clearing-system.js)
GAV Point-of-sale and goods redemption Via /api/pos/* APIs
BIGISH-YER Financial backbone (YER) Provides /api/yer/* APIs
suppliers-auction Auction platform Uses /api/yer/transfer for hybrid payment execution

Now all four applications are integrated and interconnected within a unified ecosystem relying on BIGISH-YER as the shared financial center. 🚀

---

Sovereign Suppliers Auction Node (Float-Free Architecture)

The procurement and reverse-auction subsystem designed to operate in close coordination with the BIGISH-YER core monetary clearing mechanism. This repository manages humanitarian and commercial contract allocation while mitigating macro-currency volatility.

---

🛠 Financial Precision Standards

This application strictly adheres to the Global Floating-Point Elimination Policy to pass bank-grade audits for the Pi Network 2026 Sandbox and UNICEF Innovation Fund.

· Auction Step Ledger Basis: All bids are localized and processed in absolute Integer space scaled directly to 10 Decimal Places ($1 \text{ YER} = 10^{10}$ subunits).
· Dual Token Clearing Integration: Contracts are resolved automatically via API mapping: 50% through GCV Pi Network payment arrays and 50% via the regional YER liquidity pool.

---

📡 Integrated Support & Localization Suites

This repository natively deploys:

1. Strict Integer Notification Dispatcher: Manages bid alerts mapped to atomic status IDs.
2. Autonomous AI Technical Assistant: Provides zero-float validation feedback for suppliers.
3. Human Support Pipeline: Escalates infrastructure or transaction locking contentions.
4. Decentralized Multi-Language Engine: Localizes operational forms across 10 global languages (Arabic, English, Chinese, Hindi, Indonesian, Spanish, French, Russian, Bengali, Portuguese).