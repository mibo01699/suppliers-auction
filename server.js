// ============================================================
// الملف: server.js - منصة المزادات اللامركزية
// ============================================================

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================
// نقاط النهاية الأساسية (APIs)
// ============================================================

// نقطة الصحة
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        service: 'suppliers-auction',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// تخزين مؤقت للمزادات (في الذاكرة)
let auctions = [
    { id: '1', title: 'مزاد المواد الغذائية', status: 'active', bids: 5, startingPrice: '1000' },
    { id: '2', title: 'مزاد المعدات الطبية', status: 'closed', bids: 3, startingPrice: '2000' }
];

// الحصول على قائمة المزادات
app.get('/api/auctions', (req, res) => {
    res.json({
        success: true,
        auctions
    });
});

// إنشاء مزاد جديد
app.post('/api/auctions/create', (req, res) => {
    const { title, description, startingPrice } = req.body;
    if (!title || !startingPrice) {
        return res.status(400).json({ error: 'العنوان والسعر الابتدائي مطلوبان' });
    }

    const newAuction = {
        id: Date.now().toString(),
        title,
        description: description || '',
        startingPrice,
        status: 'active',
        bids: 0,
        createdAt: new Date().toISOString()
    };

    auctions.push(newAuction);

    res.json({
        success: true,
        auction: newAuction
    });
});

// تقديم عرض
app.post('/api/auctions/:id/bid', (req, res) => {
    const { id } = req.params;
    const { amount, bidder } = req.body;

    if (!amount || !bidder) {
        return res.status(400).json({ error: 'المبلغ ومقدم العرض مطلوبان' });
    }

    const auction = auctions.find(a => a.id === id);
    if (!auction) {
        return res.status(404).json({ error: 'المزاد غير موجود' });
    }

    if (auction.status !== 'active') {
        return res.status(400).json({ error: 'المزاد غير نشط' });
    }

    auction.bids += 1;

    res.json({
        success: true,
        bid: {
            auctionId: id,
            amount,
            bidder,
            timestamp: new Date().toISOString()
        }
    });
});

// المسار الرئيسي
app.get('/', (req, res) => {
    res.json({
        message: '🦅 suppliers-auction API is running',
        version: '1.0.0',
        endpoints: ['/api/health', '/api/auctions', '/api/auctions/create', '/api/auctions/:id/bid']
    });
});

// ============================================================
// ✅ نقطة الدخول لـ Vercel
// ============================================================
module.exports = app;