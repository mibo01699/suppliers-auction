# Arabian Eagle Ecosystem (A.E.C.) - Canonical Specification
**Version:** 1.0.0 (Production & Alignment Standard)  
**Target Architecture:** Protocol 26  
**Core Financial Rail:** BIGISH-YER  

---

## 1. Core Ecosystem Governance
* **ECOSYSTEM:** Arabian Eagle Ecosystem (A.E.C.)
* **GOVERNANCE:** Arab Eagle Company / A.E.C.
* **DEVELOPMENT STATUS:** Testnet-first (Mainnet deployment strictly forbidden until official authorization)

---

## 2. Financial & Tokenomics Rail (BIGISH-YER)
* **CORE RAIL:** BIGISH-YER acts as the centralized Financial Clearing Rail for all internal applications.
* **YER TOKEN:** Yemen Economic Recovery Token.
* **YER MAX SUPPLY:** 300,000,000 YER (Fixed maximum supply across all repositories).
* **YER DECIMALS:** 10 (All YER micro-units must scale to $10^{10}$).
* **PI DECIMALS:** 7 (All Pi micro-units must scale to $10^7$).
* **ZERO FLOAT RULE:** Strict enforcement of integer or fixed-point arithmetic for all financial balances and transactions. The use of floating-point numbers (`float`, `double`, `Math.floor(Number)`) in clearing or calculations is completely eliminated to prevent rounding errors.

---

## 3. Blockchain & Integration Boundaries
* **PI NETWORK TARGET:** Target: Protocol 26. All nodes, SDKs, and configurations must explicitly target or align with v26 standards.
* **GCV (Global Consensus Value) STATUS:** Strictly classified as a Community/Internal Pricing Reference only. It is **NOT** an official Pi Network valuation and must never be portrayed as a guaranteed or official exchange rate.
* **PI DEX INTEGRATION:** Authorized external providers only. Do not assume or code for Mainnet DEX availability.
* **FIAT RAILS:** External regulated payment gateways only. Fiat conversion rates and mechanisms must never be hardcoded into the core ecosystem repositories.

---

## 4. Identity & Security (P0 Criticals)
* **IDENTITY:** Pi-supported authentication/identity mechanisms only (Pi KYC / Auth APIs). 
* **BIOMETRICS:** Absolute restriction on collecting, processing, or storing raw biometric data within the ecosystem.
* **SECURITY PURGE:** Zero tolerance for hardcoded credentials, API keys, or private seeds in repositories. All secrets must reside in secure environment variables (`.env`).

---

## 5. Domain-Specific Constraints
* **INSURANCE (Be-Well & AMAN):** Architecturally decoupled. *Be-Well* handles Health Insurance exclusively; *AMAN* handles Commercial Insurance. No shared state or blurred logic boundaries.
* **TELECOM & CONNECTIVITY (COBRA & Telcom):** 
  * Authorized and licensed providers only.
  * Explicit removal of "unblockable" claims or logic from infrastructure code. No network circumvention tactics allowed.
* **ARTIFICIAL INTELLIGENCE:** AI elements operate strictly in an Advisory/Decision-support role. Fully auditable logs are mandatory. AI has no uncontrolled autonomous financial or execution authority.
