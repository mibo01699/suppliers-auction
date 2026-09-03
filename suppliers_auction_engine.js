// suppliers_auction_engine.js - محرك المزادات الأساسي
// يستخدم BigInt للعمليات المالية

class SuppliersAuctionEngine {
    constructor() {
        this.auctions = new Map();
        this.YER_SCALE = 10000000000n; // 10^10
    }

    /**
     * إنشاء مزاد جديد
     */
    createAuction(title, startingPrice, sellerWallet) {
        const id = Date.now().toString();
        const price = BigInt(startingPrice) * this.YER_SCALE;
        
        this.auctions.set(id, {
            id,
            title,
            startingPrice: price.toString(),
            seller: sellerWallet,
            status: 'active',
            bids: [],
            createdAt: new Date().toISOString()
        });

        return { success: true, auctionId: id };
    }

    /**
     * تقديم عرض في مزاد
     */
    placeBid(auctionId, bidderWallet, amount) {
        const auction = this.auctions.get(auctionId);
        if (!auction) {
            throw new Error('المزاد غير موجود');
        }

        if (auction.status !== 'active') {
            throw new Error('المزاد غير نشط');
        }

        const bidAmount = BigInt(amount) * this.YER_SCALE;
        
        // التحقق من أن العرض أعلى من آخر عرض
        const lastBid = auction.bids.length > 0 ? auction.bids[auction.bids.length - 1] : null;
        if (lastBid && BigInt(lastBid.amount) >= bidAmount) {
            throw new Error('يجب أن يكون العرض أعلى من آخر عرض');
        }

        auction.bids.push({
            bidder: bidderWallet,
            amount: bidAmount.toString(),
            timestamp: new Date().toISOString()
        });

        return { success: true, bid: auction.bids[auction.bids.length - 1] };
    }

    /**
     * الحصول على تفاصيل مزاد
     */
    getAuction(auctionId) {
        return this.auctions.get(auctionId) || null;
    }
}

module.exports = SuppliersAuctionEngine;