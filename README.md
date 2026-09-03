# 🦅 suppliers-auction – منصة المزادات اللامركزية

> **⚠️ Important:** This is a **sandbox/testnet-only prototype**.  
> It does **NOT** claim official certification or funding from any organization.

## 📖 نبذة

**suppliers-auction** هي منصة مزايدة لامركزية مفتوحة المصدر، تهدف إلى تمكين الشفافية والعدالة في عمليات الشراء بين الموردين والمشترين، مع التركيز على دعم الاقتصادات الناشئة والمتضررة من النزاعات.

## 🛠️ المكونات الأساسية

| الملف | الوصف |
|-------|-------|
| `server.js` | نقطة الدخول الرئيسية (متوافقة مع Vercel) |
| `SovereignAuctionEngine.js` | محرك المزادات الأساسي |
| `AuctionLocalizationEngine.js` | دعم متعدد اللغات |

## 🔌 واجهات برمجة التطبيقات (APIs)

| المسار | الطريقة | الوصف |
|--------|---------|-------|
| `/api/health` | GET | التحقق من صحة الخادم |
| `/api/auctions` | GET | قائمة المزادات |
| `/api/auctions/create` | POST | إنشاء مزاد جديد |
| `/api/auctions/:id/bid` | POST | تقديم عرض |

## 🚀 التشغيل والنشر

```bash
npm install
npm start
```

📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT.

---

🦅 Developed by Arabian Eagle Technology Group (A.E.C.)