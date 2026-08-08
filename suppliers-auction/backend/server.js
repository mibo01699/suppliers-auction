// ============================================================
// الملف: server.js (معدل للدمج مع BIGISH-YER)
// المسار: suppliers-auction/backend/server.js
// الدور: خادم المزادات مع تكامل الدفع الهجين عبر BIGISH-YER
// ============================================================

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5002; // منفذ مختلف

// عنوان خادم BIGISH-YER (يجب تعيينه كمتغير بيئي)
const BIGISH_YER_API = process.env.BIGISH_YER_API || 'http://localhost:5001/api';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ============================================================
// قاعدة بيانات مؤقتة (محاكاة)
// ============================================================
let auctions = [];
let bids = [];

// ============================================================
// واجهات برمجة التطبيقات (APIs) للمزادات
// ============================================================

/**
 * إنشاء مزاد جديد
 * POST /api/auction/create
 */
app.post('/api/auction/create', (req, res) => {
    try {
        const { seller, description, startingPrice, gcvValue, piPercent, yerPercent, deadline } = req.body;
        if (!seller || !description || !startingPrice || !gcvValue || !piPercent || !yerPercent || !deadline) {
            return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
        }

        const auction = {
            id: `auc_${Date.now()}`,
            seller,
            description,
            startingPrice,
            gcvValue,
            piPercent,
            yerPercent,
            deadline,
            status: 'open',
            highestBid: 0,
            highestBidder: null,
            createdAt: new Date().toISOString()
        };
        auctions.push(auction);

        res.status(201).json({ success: true, auctionId: auction.id, auction });
    } catch (error) {
        console.error('خطأ في إنشاء المزاد:', error);
        res.status(500).json({ error: 'فشل في إنشاء المزاد' });
    }
});

/**
 * تقديم عرض في مزاد
 * POST /api/auction/bid
 */
app.post('/api/auction/bid', (req, res) => {
    try {
        const { auctionId, bidder, amount } = req.body;
        if (!auctionId || !bidder || !amount) {
            return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
        }

        const auction = auctions.find(a => a.id === auctionId);
        if (!auction) {
            return res.status(404).json({ error: 'المزاد غير موجود' });
        }
        if (auction.status !== 'open') {
            return res.status(400).json({ error: 'المزاد غير مفتوح' });
        }
        if (amount <= auction.highestBid) {
            return res.status(400).json({ error: 'يجب أن يكون العرض أعلى من آخر عرض' });
        }

        auction.highestBid = amount;
        auction.highestBidder = bidder;

        res.json({ success: true, message: `تم تقديم العرض بقيمة ${amount}` });
    } catch (error) {
        console.error('خطأ في تقديم العرض:', error);
        res.status(500).json({ error: 'فشل في تقديم العرض' });
    }
});

// ============================================================
// واجهة برمجة تطبيقات (API) الدفع الهجين (المتكاملة مع BIGISH-YER)
// ============================================================

/**
 * تنفيذ الدفع الهجين (Pi + YER) عبر BIGISH-YER
 * POST /api/payment/settle
 * Body: { "auctionId": "auc_...", "buyerPiWallet": "GABC...", "sellerPiWallet": "GXYZ...", "buyerYerWalletId": "YER-...", "sellerYerWalletId": "YER-...", "totalAmount": 100 }
 */
app.post('/api/payment/settle', async (req, res) => {
    try {
        const { auctionId, buyerPiWallet, sellerPiWallet, buyerYerWalletId, sellerYerWalletId, totalAmount } = req.body;
        if (!auctionId || !buyerPiWallet || !sellerPiWallet || !buyerYerWalletId || !sellerYerWalletId || !totalAmount) {
            return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
        }

        // 1. العثور على المزاد
        const auction = auctions.find(a => a.id === auctionId);
        if (!auction) {
            return res.status(404).json({ error: 'المزاد غير موجود' });
        }

        // 2. حساب مبالغ الدفع بناءً على النسب
        const piAmount = (totalAmount * auction.piPercent) / 100;
        const yerAmount = (totalAmount * auction.yerPercent) / 100;

        console.log(`💰 دفع Pi: ${piAmount}, دفع YER: ${yerAmount}`);

        // 3. تنفيذ تحويل YER عبر BIGISH-YER
        const yerResponse = await fetch(`${BIGISH_YER_API}/yer/transfer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fromWalletId: buyerYerWalletId,
                toWalletId: sellerYerWalletId,
                amount: yerAmount,
                description: `دفعة مزاد ${auctionId} (YER)`
            })
        });

        const yerData = await yerResponse.json();
        if (!yerData.success) {
            throw new Error(`فشل تحويل YER: ${yerData.error}`);
        }

        // 4. محاكاة تحويل Pi (سيتم استبدالها بتكامل Pi SDK)
        const piTransaction = {
            success: true,
            transactionId: `pi_tx_${Date.now()}`,
            from: buyerPiWallet,
            to: sellerPiWallet,
            amount: piAmount
        };

        // 5. تحديث حالة المزاد
        auction.status = 'settled';
        auction.settledAt = new Date().toISOString();

        // 6. إرجاع النتيجة
        res.json({
            success: true,
            message: 'تم تنفيذ الدفع الهجين بنجاح',
            payment: {
                pi: piTransaction,
                yer: yerData.transaction
            },
            auctionStatus: auction.status
        });

    } catch (error) {
        console.error('❌ خطأ في تنفيذ الدفع الهجين:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * API: الحصول على قائمة المزادات
 * GET /api/auctions
 */
app.get('/api/auctions', (req, res) => {
    res.json({ success: true, auctions });
});

// ============================================================
// تشغيل الخادم
// ============================================================
app.listen(PORT, () => {
    console.log(`🚀 خادم المزادات (suppliers-auction) يعمل على المنفذ ${PORT}`);
    console.log(`🔗 متصل بـ BIGISH-YER عبر: ${BIGISH_YER_API}`);
});

