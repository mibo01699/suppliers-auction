// AuctionLocalizationEngine.js - محرك الترجمة متعدد اللغات

class AuctionLocalizationEngine {
    constructor() {
        this.translations = {
            "ar": { bid_accepted: "تم قبول المزايدة بنجاح.", error_low_bid: "خطأ: قيمة المزاد غير كافية." },
            "en": { bid_accepted: "Bid accepted successfully.", error_low_bid: "Error: Bid amount is insufficient." },
            "zh": { bid_accepted: "竞标成功接受。", error_low_bid: "错误：投标金额不足。" },
            "th": { bid_accepted: "ยอมรับการประมูลสำเร็จ", error_low_bid: "ข้อผิดพลาด: จำนวนเงินประมูลไม่เพียงพอ" },
            "tl": { bid_accepted: "Tinanggap ang bid.", error_low_bid: "Error: Hindi sapat ang bid." },
            "ms": { bid_accepted: "Tawaran diterima.", error_low_bid: "Ralat: Tawaran tidak mencukupi." },
            "tr": { bid_accepted: "Teklif kabul edildi.", error_low_bid: "Hata: Teklif yetersiz." },
            "ko": { bid_accepted: "입찰이 수락되었습니다.", error_low_bid: "오류: 입찰 금액이 부족합니다." },
            "ru": { bid_accepted: "Ставка принята.", error_low_bid: "Ошибка: Ставка недостаточна." },
            "hi": { bid_accepted: "बोली स्वीकार कर ली गई।", error_low_bid: "त्रुटि: बोली राशि अपर्याप्त है।" },
            "ur": { bid_accepted: "بولی قبول کر لی گئی۔", error_low_bid: "غلطی: بولی کی رقم ناکافی ہے۔" }
        };
    }

    fetchLocalizedPhrase(languageCode, baselineKey) {
        const lang = this.translations[languageCode] ? languageCode : "en";
        return this.translations[lang][baselineKey] || this.translations["en"][baselineKey];
    }
}

module.exports = AuctionLocalizationEngine;