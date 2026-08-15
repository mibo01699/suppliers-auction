// تحديث تدفق ترسية المناقصات داخل راوتر مستودع suppliers-auction لعام 2026

router.post('/api/payment/settle', async (req, res) => {
    try {
        const { auctionId, totalAmount, customGcvRate, piRatioPercentage } = req.body;
        
        const totalBid = BigInt(totalAmount);

        // 1. احتساب رسوم الترسية التنافسية للمناقصات الكبرى للموردين (0.75%) بنظام BigInt
        const auctionPlatformFee = (totalBid * 75n) / 10000n;
        const finalContractValueToSettle = totalBid - auctionPlatformFee;

        // 2. تحضير الحمولة لترحيلها وتغذية الخزائن السيادية عبر النواة BIGISH-YER
        const clearingPayload = {
            auctionId: auctionId,
            totalGrossAmount: totalBid.toString(),
            platformFeeDeducted: auctionPlatformFee.toString(), // رسوم المنصة التنافسية الموثقة
            netSettlementAmount: finalContractValueToSettle.toString()
        };

        return res.status(200).json({
            success: true,
            message: "Auction tender settled under global competitive fee schema.",
            data: clearingPayload
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
