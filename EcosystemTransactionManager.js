// EcosystemTransactionManager.js - النسخة الشاملة لعام 2026 لإدارة الرسوم، حل نزاعات الغش، وعقوبات السمعة

class EcosystemTransactionManager {
    constructor() {
        this.transactions = new Map();
        // فرض عقوبة مالية صارمة لتسوية سمعة المنصة (مثال: 50,000 وحدة صغرى تُخصم من حساب البائع المخالف)
        this.platformReputationPenaltyYCOIN = 50000n; 
    }

    /**
     * 1. بدء العملية وإدراج قيم الرسوم التفصيلية للأطراف الأربعة بالـ BigInt
     */
    initializeTransaction(txId, productType, sellerWallet, buyerWallet, auditorWallet, localLogisticsWallet, globalLogisticsWallet, feesConfig) {
        const txProfile = {
            txId: txId,
            productType: productType, // مثل "HONEY" (العسل)
            seller: sellerWallet,
            buyer: buyerWallet,
            auditor: auditorWallet,
            localLogistics: localLogisticsWallet,
            globalLogistics: globalLogisticsWallet,
            financials: {
                totalProductPriceYCOIN: BigInt(feesConfig.productPrice),
                auditorFeeYCOIN: BigInt(feesConfig.auditorFee),           // رسوم خدمات التدقيق
                localLogisticsFeeYCOIN: BigInt(feesConfig.localFee),     // رسوم التوصيل المحلي
                globalLogisticsFeeYCOIN: BigInt(feesConfig.globalFee),   // رسوم الشحن عابر الحدود
                arbitrationFeeYCOIN: BigInt(feesConfig.arbitrationFee),   // رسوم التحكيم في حال النزاع
                platformFeeYCOIN: 0n,
                returnShippingCostYCOIN: BigInt(feesConfig.returnCost || 0) // تكاليف إرجاع المنتج
            },
            lifecycleStatus: "INITIALIZED", 
            fraudEvidenceHash: null, // وثائق إثبات الغش المرفوعة من المشتري أو المختبر
            auditLogs: []
        };

        this.transactions.set(txId, txProfile);
        return txProfile;
    }

    /**
     * 2. معالجة حالة الغش الصارمة (إرجاع المنتج، تحميل التكاليف، وعقوبات تسوية السمعة)
     */
    processFraudResolution(txId, buyerEvidenceHash) {
        const tx = this.transactions.get(txId);
        if (!tx) throw new Error("TRANSACTION_NOT_FOUND");

        tx.lifecycleStatus = "FRAUD_RESOLVED_RETURN_INITIATED";
        tx.fraudEvidenceHash = buyerEvidenceHash; // حفظ وثائق إثبات الغش المقدمة من المشتري

        // حساب إجمالي المبالغ المستحقة على البائع (تكاليف الإرجاع + عقوبة السمعة + رسوم التحكيم)
        const totalSellerPenalties = tx.financials.returnShippingCostYCOIN + 
                                     this.platformReputationPenaltyYCOIN + 
                                     tx.financials.arbitrationFeeYCOIN;

        tx.auditLogs.push(`🚨 [بروتوكول مكافحة الغش]: تم إثبات الغش بناءً على الوثيقة المرفوعة: ${buyerEvidenceHash}`);
        tx.auditLogs.push(`📦 [نص صريح]: يُلزم البائع بإعادة المنتج إلى مخازنه وتحمل تكاليف الشحن العكسي البالغة: ${tx.financials.returnShippingCostYCOIN} وحدة.`);
        tx.auditLogs.push(`⚖️ [عقوبة السمعة]: فرض غرامة تسوية سمعة المنصة بقيمة: ${this.platformReputationPenaltyYCOIN} وحدة تُخصم من مستحقات التاجر.`);

        return {
            status: tx.lifecycleStatus,
            buyerRefundAmount: (tx.financials.totalProductPriceYCOIN + tx.financials.auditorFeeYCOIN).toString(), // إعادة كامل أموال المشتري
            chargeToSeller: totalSellerPenalties.toString(), // المبالغ المطلوب سحبها إجبارياً من حساب التاجر الموقوف
            evidenceLogged: tx.fraudEvidenceHash
        };
    }

    /**
     * 3. حالة النجاح الكامل وتوزيع الرسوم للأطراف الأربعة بعد استقطاع رسوم المنصة التنافسية
     */
    finalizeSuccessfulTransaction(txId, platformType) {
        const tx = this.transactions.get(txId);
        if (!tx) throw new Error("TRANSACTION_NOT_FOUND");

        tx.lifecycleStatus = "SUCCESSFUL_DELIVERY";
        const grossAmount = tx.financials.totalProductPriceYCOIN;

        // استقطاع رسوم المنصة التنافسية بناءً على نوع المعاملة عبر النواة (0.5% لـ GAV أو 0.75% للمزاد)
        const platformFeeRate = platformType === "GAV" ? 5n : 75n;
        tx.financials.platformFeeYCOIN = (grossAmount * platformFeeRate) / 1000n;

        tx.auditLogs.push("💰 تم صرف الرسوم والمستحقات للأطراف الأربعة (البائع، المدقق، الموصل، الشاحن) مجزأة ونقداً.");
        return {
            status: tx.lifecycleStatus,
            platformFeeDeducted: tx.financials.platformFeeYCOIN.toString(),
            sellerPayout: (grossAmount - tx.financials.platformFeeYCOIN).toString()
        };
    }
}

module.exports = EcosystemTransactionManager;
