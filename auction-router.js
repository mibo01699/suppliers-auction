// auction-router.js - النسخة المحدثة لدعم المزادات ذات النسب التوافقية الحرة
const express = require('express');
const router = express.Router();
const axios = require('axios'); // لتمرير البيانات المباشرة للمقاصة المالية

router.post('/api/payment/settle', async (req, res) => {
    try {
        const { 
            auctionId, 
            buyerPiWallet, 
            sellerPiWallet, 
            buyerYerWalletId, 
            sellerYerWalletId, 
            totalAmount,          // القيمة الإجمالية للعطاء بالوحدات الصغرى للعملة المحلية
            customGcvRate,        // سعر صرف الـ Pi المتوافق عليه بناءً على الـ GCV مقوم بالعملة المحلية
            piRatioPercentage    // النسبة المئوية المخصصة لـ Pi المتفق عليها بين الطرفين (0 - 100)
        } = req.body;

        // التحقق الأساسي من النسبة قبل الترحيل المالي
        const ratio = parseInt(piRatioPercentage, 10);
        if (isNaN(ratio) || ratio < 0 || ratio > 100) {
            return res.status(400).json({ success: false, error: "Invalid Pi ratio percentage. Must be 0-100." });
        }

        // تحضير الحمولة البرمجية لإرسالها لمركز المقاصة المشترك BIGISH-YER
        const clearingPayload = {
            auctionId: auctionId,
            totalBidInYCOIN: totalAmount.toString(), 
            gcvPiRateInYCOIN: customGcvRate.toString(),
            piRatioPercentage: ratio
        };

        // التوجيه التلقائي لخادم المقاصة المحدث
        const bigishYerApiUrl = process.env.BIGISH_YER_API || 'http://localhost:3000';
        const response = await axios.post(`${bigishYerApiUrl}/api/settle-auction-deal`, clearingPayload);

        // إرجاع خطة التسوية المعتمدة لنقطة المزاد لبدء توقيع الـ SDK مستقبلاً
        return res.status(200).json({
            success: true,
            message: "Auction finalized with mutually agreed custom ratios.",
            clearingDetails: response.data
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: "Clearing connection failed or " + error.message 
        });
    }
});

module.exports = router;
