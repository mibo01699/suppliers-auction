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

```

---

### 3. `frontend/index.html` – نسخة مبسطة (نظراً لتعذر الوصول إلى الملف الأصلي)

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>suppliers-auction – منصة المزادات</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f7fa; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; padding: 20px; background: #1a1a2e; color: white; border-radius: 10px; }
        .auction-card { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .status-active { color: green; }
        .status-closed { color: red; }
        button { background: #e5a93c; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
        button:hover { background: #d4942a; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🦅 suppliers-auction</h1>
            <p>منصة المزادات اللامركزية – بيئة اختبار (Sandbox)</p>
        </div>

        <div id="auctions">
            <h2>المزادات النشطة</h2>
            <div id="auction-list">
                <!-- سيتم عرض المزادات هنا عبر JavaScript -->
            </div>
        </div>

        <div style="margin-top: 20px; text-align: center;">
            <button onclick="createAuction()">إنشاء مزاد جديد</button>
        </div>

        <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #666;">
            ⚠️ هذا تطبيق تجريبي في بيئة الحماية (Sandbox/Testnet).
        </div>
    </div>

    <script>
        async function loadAuctions() {
            try {
                const response = await fetch('/api/auctions');
                const data = await response.json();
                const list = document.getElementById('auction-list');
                list.innerHTML = data.auctions.map(a => `
                    <div class="auction-card">
                        <h3>${a.title}</h3>
                        <p>السعر الابتدائي: ${a.startingPrice} YER</p>
                        <p>الحالة: <span class="status-${a.status}">${a.status === 'active' ? 'نشط' : 'مغلق'}</span></p>
                        <p>عدد العطاءات: ${a.bids || 0}</p>
                    </div>
                `).join('');
            } catch (error) {
                console.error('فشل تحميل المزادات:', error);
            }
        }

        async function createAuction() {
            const title = prompt('أدخل عنوان المزاد:');
            const price = prompt('أدخل السعر الابتدائي (YER):');
            if (title && price) {
                try {
                    const response = await fetch('/api/auctions/create', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ title, startingPrice: price })
                    });
                    const data = await response.json();
                    if (data.success) {
                        alert('تم إنشاء المزاد بنجاح!');
                        loadAuctions();
                    }
                } catch (error) {
                    alert('فشل إنشاء المزاد: ' + error.message);
                }
            }
        }

        document.addEventListener('DOMContentLoaded', loadAuctions);
    </script>
</body>
</html>
```

---

4. frontend/tracking.html – نسخة مبسطة

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تتبع المزادات – suppliers-auction</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f7fa; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; padding: 20px; background: #1a1a2e; color: white; border-radius: 10px; }
        .track-card { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .status-pending { color: orange; }
        .status-shipped { color: blue; }
        .status-delivered { color: green; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📦 تتبع المزادات – suppliers-auction</h1>
            <p>بيئة اختبار (Sandbox)</p>
        </div>

        <div id="tracking">
            <h2>حالة الشحنات</h2>
            <div id="tracking-list">
                <!-- سيتم عرض بيانات التتبع هنا -->
            </div>
        </div>

        <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #666;">
            ⚠️ هذا تطبيق تجريبي في بيئة الحماية (Sandbox/Testnet).
        </div>
    </div>

    <script>
        // محاكاة بيانات التتبع
        const trackingData = [
            { id: 'TRK-001', product: 'مواد غذائية', status: 'shipped', location: 'عدن' },
            { id: 'TRK-002', product: 'معدات طبية', status: 'delivered', location: 'صنعاء' },
            { id: 'TRK-003', product: 'مواد بناء', status: 'pending', location: 'المخا' }
        ];

        function loadTracking() {
            const list = document.getElementById('tracking-list');
            list.innerHTML = trackingData.map(t => `
                <div class="track-card">
                    <h3>${t.product}</h3>
                    <p>الرقم: ${t.id}</p>
                    <p>الحالة: <span class="status-${t.status}">${t.status === 'pending' ? 'قيد المعالجة' : t.status === 'shipped' ? 'تم الشحن' : 'تم التسليم'}</span></p>
                    <p>الموقع: ${t.location}</p>
                </div>
            `).join('');
        }

        document.addEventListener('DOMContentLoaded', loadTracking);
    </script>
</body>
</html>