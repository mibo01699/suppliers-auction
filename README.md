## 🏗️ Technical Architecture (Dual-Chain Ready)

This protocol is architected for a **dual-chain settlement layer**, combining the reach of EVM with the utility of Pi Network.

*   **Core Logic & Auction Contracts:** Built in **Solidity** and designed to be deployed on any **Ethereum Virtual Machine (EVM)** chain (e.g., Ethereum, Polygon). This ensures global accessibility and compatibility with the Ethereum ecosystem's tools and funding (e.g., Ethereum Foundation grants).
*   **Settlement Layer (Hybrid Engine):** The atomic split payment logic is designed to trigger two parallel settlement paths:
    1.  **Pi Network Settlement:** Interfaces with the **Pi Network SDK** (via a secure bridge or oracle) to execute the Pi coin transfer based on the GCV.
    2.  **YER Token Settlement:** Directly interacts with the `BIGISH-YER` smart contract to execute the YER token transfer on the EVM chain.
*   **Compliance with Pi Core Team Mandates:** The protocol's design adheres to the Pi Network's core
 principles:
    *   **KYC-Enforced Participation:** Access to the auction platform for both buyers and suppliers is strictly gated through **Pi SDK Authentication**, ensuring only verified Pioneers can participate.
    *   **Utility-Driven Value:** By embedding the **Global Consensus Value (GCV)** as a cornerstone of the settlement logic, the protocol actively contributes to establishing Pi's real-world utility, a key goal of the Pi Core Team.
*   **Identity Layer:** Utilizes **Decentralized Identity (DID)** standards, with the Pi SDK acting as a primary identity provider for verified users.

## 🖥️ Frontend Prototypes

The project includes two frontend prototypes to demonstrate core functionalities:

1. **Main Dashboard (`frontend/index.html`):** Displays active auctions and integrates a 3D shipment tracking panel powered by Leaflet.
2. **Shared Tracking Link (`frontend/tracking.html`):** A standalone tracking page with a shareable link, designed for customs officers and shipping companies.

### How to Run the Frontend
Simply open the `index.html` or `tracking.html` files in your browser to explore the user interface and tracking features.

## 🔧 Backend Server

The backend server provides RESTful APIs for the application. It acts as a middleware between the frontend and the Pi Network smart contracts.

### Setup and Run

1. Navigate to the `backend/` folder:
   ```bash
   cd backend


npm install

npm start

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

```

## ✅ خلاصة الخطوات المنفذة

1.  **تم إنشاء خادم خلفي (Backend) كامل** مع واجهات برمجة تطبيقات (APIs) تغطي جميع وظائف التطبيق (المزادات، الدفع، التتبع، KYB).
2.  **تم توثيق كيفية تشغيل الخادم** واستخدام الـ APIs في ملف `README.md`.
3.  **الأساس جاهز الآن** لربط الـ APIs فعلياً بالعقود الذكية على بلوكشين Pi (سيتم استبدال دوال المحاكاة باستدعاءات حقيقية لـ Pi SDK و Soroban).

**الآن، أصبح لديك تطبيق متكامل من الناحية الهيكلية: عقود ذكية، واجهة أمامية، وخادم خلفي.** 🚀