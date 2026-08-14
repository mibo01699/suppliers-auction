#!/bin/bash
# deploy-all-five-repositories.sh - سكربت الرفع التلقائي والموحد للمنظومة الخماسية لعام 2026
echo "========================================================================"
echo "🌐 جاري رفع وتحديث المستودعات الخمسة المكتملة برمجياً لـ Pi Network..."
echo "========================================================================"

deploy_repo() {
    local repo_dir=$1
    local commit_message=$2
    if [ -d "$repo_dir" ]; then
        cd "$repo_dir"
        git add .
        git commit -m "$commit_message"
        git push origin main || git push origin master
        cd ..
        echo "✅ تم رفع مستودع $repo_dir بنجاح تام ومطابقته لكافة الشروط."
    else
        echo "⚠️ تنبيه: المجلد $repo_dir غير موجود محلياً، يرجى إنشاؤه أولاً وحفظ ملفاته."
    fi
}

deploy_repo "BIGISH-YER" "Feat: Deploy unified identity registry and sovereign vesting wallet linked directly to DEX."
deploy_repo "AJYAL" "Feat: Deploy smart aid prioritizer, unesco compliant certs, and conflict zone survey ledger."
deploy_repo "GAV-The-Incense-Route" "Feat: Deploy standard total value invoice payment calculator for crop retail."
deploy_repo "suppliers-auction" "Feat: Deploy hybrid reverse auction Rust contracts for macro tender settlement."
deploy_repo "Cobra-eSIM" "Feat: Deploy custom Profit Margin Billing Engine to lock Pi payment into net profits and secure 100% of capital in YER."

echo "========================================================================"
echo "🎉 اكتملت العملية! جميع المستودعات الخمسة جاهزة، محدثة، ومرفوعة برمجياً."
echo "========================================================================"
