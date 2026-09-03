// SovereignAuctionEngine.js - محرك المزادات السيادي
// يستخدم BigInt للعمليات المالية

class SovereignAuctionEngine {
    constructor(dbInstance) {
        this.db = dbInstance;
        this.YER_SCALE = 10000000000n;
        this.MIN_INCREMENT = 50n;
    }

    /**
     * تقديم عرض من مورد
     */
    submitSupplierBid(auctionId, supplierWallet, rawBidAmount, rawCurrentHighest) {
        const incomingBid = BigInt(rawBidAmount) * this.YER_SCALE;
        const currentHighest = BigInt(rawCurrentHighest || "0");
        const minIncrement = this.MIN_INCREMENT * this.YER_SCALE;

        if (incomingBid <= 0n) {
            throw new Error("يجب أن يكون العرض قيمة موجبة");
        }

        // في المزادات العكسية، العرض الأقل هو الأفضل
        if (currentHighest > 0n && incomingBid >= currentHighest) {
            throw new Error("يجب أن يكون العرض أقل من آخر عرض");
        }

        return {
            success: true,
            auctionRef: auctionId,
            vendor: supplierWallet,
            registeredBid: incomingBid.toString(),
            timestamp: Date.now().toString()
        };
    }
}

module.exports = SovereignAuctionEngine;