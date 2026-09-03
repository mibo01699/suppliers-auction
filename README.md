# 🦅 suppliers-auction – منصة المزادات اللامركزية

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black.svg)](https://vercel.com/)

> **⚠️ Important:** This is a **sandbox/testnet-only prototype**.  
> It does **NOT** claim official certification or funding from any organization.

---

## 📖 نبذة عن المشروع

**suppliers-auction** هي منصة مزايدة لامركزية مفتوحة المصدر، تهدف إلى تمكين الشفافية والعدالة في عمليات الشراء بين الموردين والمشترين، مع التركيز على دعم الاقتصادات الناشئة والمتضررة من النزاعات.

تعتمد المنصة على **نظام تسوية هجين** يجمع بين عملة Pi Coin (بمرجعية GCV) ورمز YER (من نظام `BIGISH-YER`)، مما يتيح دفعات ذرية وآمنة.

---

## 🎯 الرؤية والأهداف

| الهدف | الوصف |
|-------|-------|
| **الشفافية** | جميع المزادات والعطاءات مسجلة بشكل غير قابل للتغيير. |
| **العدالة** | نظام مزايدة مفتوح للجميع، مع آلية تحقق من الهوية. |
| **الكفاءة** | تسوية فورية وآمنة للمدفوعات عبر نظام هجين. |
| **الشمولية** | فتح الأسواق العالمية أمام الموردين المحليين المعتمدين. |

---

## 🛠️ المكونات الأساسية

| الملف | الوصف |
|-------|-------|
| `server.js` | نقطة الدخول الرئيسية (متوافقة مع Vercel) |
| `SovereignAuctionEngine.js` | محرك المزادات السيادي (باستخدام `BigInt`) |
| `AuctionLocalizationEngine.js` | دعم متعدد اللغات (11 لغة) |
| `AuctionSupportSystem.js` | نظام دعم وتذاكر |
| `EcosystemTransactionManager.js` | إدارة المعاملات والرسوم |
| `suppliers_auction_engine.js` | محرك المزادات الأساسي |
| `frontend/index.html` | واجهة المستخدم الرئيسية |
| `frontend/tracking.html` | واجهة تتبع الشحنات |

---

## 🔌 واجهات برمجة التطبيقات (APIs)

| المسار | الطريقة | الوصف |
|--------|---------|-------|
| `/api/health` | GET | التحقق من صحة الخادم |
| `/api/auctions` | GET | الحصول على قائمة المزادات النشطة |
| `/api/auctions/create` | POST | إنشاء مزاد جديد |
| `/api/auctions/:id/bid` | POST | تقديم عرض في مزاد |
| `/api/auctions/:id/close` | POST | إغلاق مزاد (تحديد الفائز) |

**مثال على طلب إنشاء مزاد:**
```json
POST /api/auctions/create
{
  "title": "توريد مواد غذائية",
  "description": "توريد 1000 سلة غذائية",
  "startingPrice": "5000",
  "seller": "supplier_123"
}
```

مثال على طلب تقديم عرض:

```json
POST /api/auctions/123/bid
{
  "amount": "4500",
  "bidder": "company_xyz"
}
```

---

🚀 التشغيل والنشر

التشغيل المحلي

```bash
# استنساخ المستودع
git clone https://github.com/mibo01699/suppliers-auction.git
cd suppliers-auction

# تثبيت الاعتماديات
npm install

# تشغيل الخادم
npm start
```

النشر على Vercel

المشروع مهيأ للنشر الفوري على Vercel. قم بربط المستودع بحساب Vercel وسيتم النشر تلقائياً.

---

🧪 الاختبارات

```bash
npm test
```

---

📁 هيكل المستودع

```
suppliers-auction/
├── server.js                     # نقطة الدخول الرئيسية
├── package.json                  # إعدادات المشروع
├── vercel.json                   # تهيئة النشر على Vercel
├── .env.example                  # نموذج متغيرات البيئة
├── README.md                     # هذا الملف
├── LICENSE                       # رخصة المشروع
│
├── docs/                         # التوثيق
│   ├── WHITEPAPER.md             # الورقة البيضاء للمشروع
│   └── YER_INTEGRATION.md        # توثيق تكامل YER
│
├── frontend/                     # واجهة المستخدم
│   ├── index.html                # الصفحة الرئيسية
│   └── tracking.html             # صفحة تتبع الشحنات
│
├── locales/                      # ملفات الترجمة
│   └── languageManager.js        # محرك إدارة اللغات
│
├── tests/                        # الاختبارات
│   └── auction.test.js           # اختبارات واجهات API
│
├── .github/                      # إعدادات GitHub
│   └── workflows/
│       └── auction_ci.yml        # سير العمل (CI)
│
├── SovereignAuctionEngine.js     # محرك المزادات السيادي
├── AuctionLocalizationEngine.js  # محرك الترجمة
├── AuctionSupportSystem.js       # نظام الدعم
├── EcosystemTransactionManager.js # إدارة المعاملات
└── suppliers_auction_engine.js   # محرك المزادات الأساسي
```

---

🔗 التكامل مع المشاريع الأخرى

المشروع الوصف الرابط
BIGISH-YER البنية التحتية المالية الأساسية (تسوية YER) GitHub
GAV سلسلة التوريد والتجارة GitHub
AJYAL منصة التعليم والمساعدات GitHub

---

🤝 المساهمة

نرحب بمساهماتكم! يرجى قراءة دليل المساهمة قبل تقديم أي طلب سحب (Pull Request).

ملاحظات هامة للمساهمين:

· استخدام BigInt في أي عمليات مالية.
· تجنب استخدام Number أو parseFloat في الحسابات المالية.
· عدم تخزين أي مفاتيح خاصة أو أسرار في الكود المصدري.

---

📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT – راجع ملف LICENSE للتفاصيل.

---

📬 التواصل

· Official X: @Arabianeagleaec
· CEO X: @YemenPi
· GitHub: mibo01699

---

⚠️ إخلاء المسؤولية

هذا المشروع هو نموذج أولي يعمل فقط في بيئة الحماية (Sandbox/Testnet).
لا يدعي أي شراكة رسمية أو تمويل أو اعتماد من أي جهة، بما في ذلك UNICEF، Mercy Corps، أو Pi Network Core Team.

---

🦅 Developed by Arabian Eagle Technology Group (A.E.C.)