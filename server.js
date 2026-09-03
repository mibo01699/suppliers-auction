// ============================================================
// الملف: server.js - منصة المزادات اللامركزية (متوافقة مع Vercel)
// الدور: إدارة المزادات، العطاءات، العقود
// ============================================================

const express = require('express');
const cors = require('cors');
const app = express();

// التفعيلات الأساسية
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

// الحصول على قائمة المزادات (محاكاة)
app.get('/api/auctions', (req, res) => {
    res.json({
        success: true,
        auctions: [
            { id: '1', title: 'مزاد المواد الغذائية', status: 'active', bids: 5 },
            { id: '2', title: 'مزاد المعدات الطبية', status: 'closed', bids: 3 }
        ]
    });
});

// إنشاء مزاد جديد (محاكاة)
app.post('/api/auctions/create', (req, res) => {
    const { title, description, startingPrice } = req.body;
    if (!title || !startingPrice) {
        return res.status(400).json({ error: 'العنوان والسعر الابتدائي مطلوبان' });
    }

    res.json({
        success: true,
        auction: {
            id: Date.now().toString(),
            title,
            description: description || '',
            startingPrice: startingPrice,
            status: 'active',
            createdAt: new Date().toISOString()
        }
    });
});

// تقديم عرض (محاكاة)
app.post('/api/auctions/:id/bid', (req, res) => {
    const { id } = req.params;
    const { amount, bidder } = req.body;

    if (!amount || !bidder) {
        return res.status(400).json({ error: 'المبلغ ومقدم العرض مطلوبان' });
    }

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