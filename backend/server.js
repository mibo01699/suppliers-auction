// ============================================================
// الملف: backend/server.js
// المسار: suppliers-auction/backend/server.js
// الدور: الخادم الخلفي الرئيسي، يوفر APIs للتفاعل مع التطبيق
// ============================================================

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { AuctionContract, HybridPaymentContract, TrackingContract, KYBContract } = require('./contracts');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ============================================================
// واجهات برمجة التطبيقات (APIs) للمزادات
// ============================================================

/**
 * API: إنشاء مزاد جديد
 * POST /api/auction/create
 */
app.post('/api/auction/create', async (req, res) => {
    try {
        const { seller, description, startingPrice, gcvValue, piPercent, yerPercent, deadline } = req.body;
        
        // التحقق من صحة المدخلات
        if (!seller || !description || !startingPrice || !gcvValue || !piPercent || !yerPercent || !deadline) {
            return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
        }

        // استدعاء عقد Auction (محاكاة)
        // const auctionId = await AuctionContract.createAuction(...);
        const auctionId = Date.now(); // محاكاة

        res.status(201).json({
            success: true,
            auctionId: auctionId,
            message: 'تم إنشاء المزاد بنجاح'
        });
    } catch (error) {
        console.error('خطأ في إنشاء المزاد:', error);
        res.status(500).json({ error: 'فشل في إنشاء المزاد' });
    }
});

/**
 * API: تقديم عرض في مزاد
 * POST /api/auction/bid
 */
app.post('/api/auction/bid', async (req, res) => {
    try {
        const { auctionId, bidder, amount } = req.body;
        
        if (!auctionId || !bidder || !amount) {
            return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
        }

        // استدعاء عقد Auction (محاكاة)
        // await AuctionContract.placeBid(auctionId, bidder, amount);

        res.json({
            success: true,
            message: `تم تقديم العرض بقيمة ${amount} للمزاد ${auctionId}`
        });
    } catch (error) {
        console.error('خطأ في تقديم العرض:', error);
        res.status(500).json({ error: 'فشل في تقديم العرض' });
    }
});

/**
 * API: ترسية المزاد
 * POST /api/auction/finalize
 */
app.post('/api/auction/finalize', async (req, res) => {
    try {
        const { auctionId } = req.body;
        
        if (!auctionId) {
            return res.status(400).json({ error: 'معرف المزاد مطلوب' });
        }

        // استدعاء عقد Auction (محاكاة)
        // await AuctionContract.finalizeAuction(auctionId);

        res.json({
            success: true,
            message: `تم ترسية المزاد ${auctionId}`
        });
    } catch (error) {
        console.error('خطأ في ترسية المزاد:', error);
        res.status(500).json({ error: 'فشل في ترسية المزاد' });
    }
});

// ============================================================
// واجهات برمجة التطبيقات (APIs) للدفع الهجين
// ============================================================

/**
 * API: تنفيذ الدفع الهجين
 * POST /api/payment/settle
 */
app.post('/api/payment/settle', async (req, res) => {
    try {
        const { buyer, seller, totalAmount, piAmount, yerAmount, auctionId } = req.body;
        
        if (!buyer || !seller || !totalAmount || !piAmount || !yerAmount || !auctionId) {
            return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
        }

        // استدعاء عقد HybridPayment (محاكاة)
        // await HybridPaymentContract.settlePayment(buyer, seller, totalAmount, piAmount, yerAmount, auctionId);

        res.json({
            success: true,
            message: `تم تنفيذ الدفع الهجين للمزاد ${auctionId}`
        });
    } catch (error) {
        console.error('خطأ في تنفيذ الدفع الهجين:', error);
        res.status(500).json({ error: 'فشل في تنفيذ الدفع الهجين' });
    }
});

// ============================================================
// واجهات برمجة التطبيقات (APIs) للتتبع
// ============================================================

/**
 * API: إنشاء سجل تتبع
 * POST /api/tracking/create
 */
app.post('/api/tracking/create', async (req, res) => {
    try {
        const { auctionId, buyer, seller, destination } = req.body;
        
        if (!auctionId || !buyer || !seller || !destination) {
            return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
        }

        // استدعاء عقد Tracking (محاكاة)
        // const trackingId = await TrackingContract.createTracking(auctionId, buyer, seller, destination);
        const trackingId = `TRACK-${Date.now()}`; // محاكاة

        res.status(201).json({
            success: true,
            trackingId: trackingId,
            message: 'تم إنشاء سجل التتبع'
        });
    } catch (error) {
        console.error('خطأ في إنشاء سجل التتبع:', error);
        res.status(500).json({ error: 'فشل في إنشاء سجل التتبع' });
    }
});

/**
 * API: إضافة نقطة تتبع
 * POST /api/tracking/add-point
 */
app.post('/api/tracking/add-point', async (req, res) => {
    try {
        const { trackingId, location, status, latitude, longitude, actor } = req.body;
        
        if (!trackingId || !location || !status || !latitude || !longitude || !actor) {
            return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
        }

        // استدعاء عقد Tracking (محاكاة)
        // await TrackingContract.addTrackingPoint(trackingId, location, status, latitude, longitude, actor);

        res.json({
            success: true,
            message: `تم إضافة نقطة تتبع للشحنة ${trackingId}`
        });
    } catch (error) {
        console.error('خطأ في إضافة نقطة تتبع:', error);
        res.status(500).json({ error: 'فشل في إضافة نقطة تتبع' });
    }
});

/**
 * API: الحصول على معلومات التتبع
 * GET /api/tracking/:id
 */
app.get('/api/tracking/:id', async (req, res) => {
    try {
        const trackingId = req.params.id;
        
        if (!trackingId) {
            return res.status(400).json({ error: 'معرف التتبع مطلوب' });
        }

        // استدعاء عقد Tracking (محاكاة)
        // const trackingInfo = await TrackingContract.getTrackingInfo(trackingId);
        const trackingInfo = {
            status: 'في الطريق',
            currentLocation: 'ميناء عدن',
            destination: 'صنعاء',
            points: [
                { location: 'ميناء عدن', status: 'مغادرة', lat: 12.8, lng: 44.9, timestamp: '2026-08-07 10:00' },
                { location: 'نقطة تفتيش', status: 'تفتيش جمركي', lat: 13.2, lng: 45.5, timestamp: '2026-08-08 08:30' }
            ]
        };

        res.json({
            success: true,
            trackingInfo: trackingInfo
        });
    } catch (error) {
        console.error('خطأ في الحصول على معلومات التتبع:', error);
        res.status(500).json({ error: 'فشل في الحصول على معلومات التتبع' });
    }
});

// ============================================================
// واجهات برمجة التطبيقات (APIs) لـ KYB
// ============================================================

/**
 * API: تسجيل كيان تجاري جديد
 * POST /api/kyb/register
 */
app.post('/api/kyb/register', async (req, res) => {
    try {
        const { entityName, entityType, piWallet, documentsHash, adminWallet } = req.body;
        
        if (!entityName || !entityType || !piWallet || !documentsHash || !adminWallet) {
            return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
        }

        // استدعاء عقد KYB (محاكاة)
        // const entityId = await KYBContract.registerEntity(entityName, entityType, piWallet, documentsHash, adminWallet);
        const entityId = Date.now(); // محاكاة

        res.status(201).json({
            success: true,
            entityId: entityId,
            message: 'تم تسجيل الكيان التجاري'
        });
    } catch (error) {
        console.error('خطأ في تسجيل الكيان التجاري:', error);
        res.status(500).json({ error: 'فشل في تسجيل الكيان التجاري' });
    }
});

/**
 * API: منح صلاحية لمستخدم
 * POST /api/kyb/grant-role
 */
app.post('/api/kyb/grant-role', async (req, res) => {
    try {
        const { entityId, userPiWallet, role, granterPiWallet } = req.body;
        
        if (!entityId || !userPiWallet || !role || !granterPiWallet) {
            return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
        }

        // استدعاء عقد KYB (محاكاة)
        // await KYBContract.grantRole(entityId, userPiWallet, role, granterPiWallet);

        res.json({
            success: true,
            message: `تم منح دور ${role} للمستخدم ${userPiWallet}`
        });
    } catch (error) {
        console.error('خطأ في منح الصلاحية:', error);
        res.status(500).json({ error: 'فشل في منح الصلاحية' });
    }
});

// ============================================================
// تشغيل الخادم
// ============================================================
app.listen(PORT, () => {
    console.log(`🚀 خادم GAP الخلفي يعمل على المنفذ ${PORT}`);
    console.log(`📦 APIs جاهزة للاستخدام: http://localhost:${PORT}/api`);
});