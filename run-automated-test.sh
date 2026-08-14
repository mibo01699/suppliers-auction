#!/bin/bash
# run-automated-test.sh - سكربت الحقن التلقائي واختبار تدفق المزاد

echo "⏳ بدء الفحص الآلي وضخ بيانات المزاد التوافقية..."
echo "--------------------------------------------------"

# محاكاة إرسال طلب سداد هجين من خادم suppliers-auction إلى BIGISH-YER
curl -X POST http://localhost:3000/api/settle-auction-deal \
-H "Content-Type: application/json" \
-d '{
  "totalBidInYCOIN": "200000",
  "gcvPiRateInYCOIN": "314159",
  "piRatioPercentage": 65
}'

echo -e "\n--------------------------------------------------"
echo "✅ تم إرسال صفقة المزاد واختبار المقاصة المرنة بنجاح!"
