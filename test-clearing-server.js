// test-clearing-server.js - خادم المقاصة المؤتمت للاختبار السريع
const express = require('express');
const app = express();
app.use(express.json());

// محرك المقاصة المرن المستورد منطقياً من BIGISH-YER
function calculateClearing(totalBid, gcvRate, piRatio) {
    const total = BigInt(totalBid);
    const rate = BigInt(gcvRate);
    const ratio = BigInt(piRatio);
    
    const yerShare = (total * (100n - ratio)) / 100n;
    const piShareInCurrency = total - yerShare;
    const piStroops = (piShareInCurrency * 10000000n) / rate;

    return {
        yerRequired: yerShare.toString(),
        piRequiredStroops: piStroops.toString()
    };
}

app.post('/api/settle-auction-deal', (req, res) => {
    const { totalBidInYCOIN, gcvPiRateInYCOIN, piRatioPercentage } = req.body;
    const result = calculateClearing(totalBidInYCOIN, gcvPiRateInYCOIN, piRatioPercentage);
    res.json({ success: true, ...result });
});

app.listen(3000, () => console.log('🎯 خادم المقاصة التجريبي يعمل الآن على المنفذ 3000...'));
