// AuctionSupportSystem.js - نظام دعم المزادات

const AuctionLocalizationEngine = require('./AuctionLocalizationEngine');

class AuctionSupportSystem {
    constructor() {
        this.YER_SCALE = 10000000000n;
        this.i18n = new AuctionLocalizationEngine();
        this.tickets = new Map();
        this.ticketCounter = 0n;
    }

    /**
     * إرسال إشعار للمورد
     */
    dispatchNotification(supplierWallet, alertType, value, langCode = 'en') {
        const valueInt = BigInt(value) * this.YER_SCALE;
        const message = this.i18n.fetchLocalizedPhrase(langCode, alertType === 1 ? 'bid_accepted' : 'error_low_bid');

        return {
            recipient: supplierWallet,
            alertCode: alertType.toString(),
            payload: valueInt.toString(),
            message: `${message} [Ref: ${valueInt.toString()}]`
        };
    }

    /**
     * استشارة مساعد الذكاء الاصطناعي
     */
    consultAI(query, bidAmount, langCode = 'en') {
        try {
            const bidInt = BigInt(bidAmount) * this.YER_SCALE;
            return {
                verdict: 'ANALYSIS_COMPLETE',
                valid: true,
                message: this.i18n.fetchLocalizedPhrase(langCode, 'bid_accepted') + ` [${bidInt.toString()}]`
            };
        } catch (err) {
            return {
                verdict: 'PARSING_FAILED',
                valid: false,
                message: this.i18n.fetchLocalizedPhrase(langCode, 'error_low_bid')
            };
        }
    }

    /**
     * إنشاء تذكرة دعم
     */
    createTicket(supplierWallet, reasonCode, description) {
        this.ticketCounter += 1n;
        const id = `TICKET-${this.ticketCounter.toString()}`;
        const ticket = {
            id,
            vendor: supplierWallet,
            reason: reasonCode,
            description,
            status: 'OPEN',
            created: Date.now().toString()
        };
        this.tickets.set(id, ticket);
        return ticket;
    }
}

module.exports = AuctionSupportSystem;