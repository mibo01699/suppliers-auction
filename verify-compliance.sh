#!/bin/bash
# verify-compliance.sh - أمر التشغيل والتحقق التلقائي من توافق المزاد

echo "⏳ بدء تشغيل الفحص الآلي لمستودع suppliers-auction لعام 2026..."
echo "========================================================================"

# السيناريو الأول: فحص صفقة ناجحة بنسبة توافقية حرة (75% لـ Pi) وسعر GCV
echo "⚡ [الاختبار 1] إرسال صفقة مزاد ناجحة متوافق عليها بنسبة 75% عملة Pi..."
curl -S -X POST http://localhost:3000/api/test/auction-settle \
-H "Content-Type: application/json" \
-d '{
  "totalBidInYCOIN": "300000",
  "gcvPiRateInYCOIN": "314159",
  "piRatioPercentage": 75
}'

echo -e "\n\n------------------------------------------------------------------------"

# السيناريو الثاني: فحص جدار الحماية ضد التلاعب بالنسب (إرسال نسبة غير منطقية 120%)
echo "🛡️ [الاختبار 2] فحص جدار الحماية ضد التلاعب بالبيانات (حقن نسبة 120%)..."
curl -S -X POST http://localhost:3000/api/test/auction-settle \
-H "Content-Type: application/json" \
-d '{
  "totalBidInYCOIN": "300000",
  "gcvPiRateInYCOIN": "314159",
  "piRatioPercentage": 120
}'

echo -e "\n========================================================================"
echo "✅ اكتملت أوامر الفحص والاختبار الآلي للمستودع بنجاح!"
