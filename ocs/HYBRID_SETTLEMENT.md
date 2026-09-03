# Hybrid Settlement Mechanism (Sandbox/Testnet)

**Version:** 1.0.0

> **⚠️ Important:** This is a **sandbox/testnet-only prototype**.  
> It does **NOT** claim official certification or funding from any organization.

---

## Overview

The hybrid settlement mechanism enables atomic payments split between Pi Coin and YER Token within the suppliers-auction platform.

---

## Settlement Flow

| Step | Description |
|------|-------------|
| **1. Auction Finalization** | Winning bid is confirmed. |
| **2. Split Calculation** | Pi/YER ratio is applied to the total amount. |
| **3. Pi Transfer** | Pi portion is transferred via Pi Network SDK (simulated). |
| **4. YER Transfer** | YER portion is transferred via BIGISH-YER API. |
| **5. Confirmation** | Auction is marked as settled only after both transfers succeed. |

---

## Integration Points

- **Pi Network SDK:** Simulated for sandbox testing.
- **BIGISH-YER API:** Used for YER token transfers.

---

## Security Considerations

- All calculations use `BigInt` to prevent floating-point errors.
- No private keys are handled by the server.
- All operations are validated on the server side.

---

**🦅 Developed by Arabian Eagle Technology Group (A.E.C.)**