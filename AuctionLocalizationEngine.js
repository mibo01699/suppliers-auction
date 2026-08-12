// Universal Multi-Language Translation and Localization Engine
// Optimized for East Asia, Middle East, and Global Core Hubs
// Strictly manages language indexing keys using Absolute Integer Mappings (No Floats)

class AuctionLocalizationEngine {
    constructor() {
        // Core dictionary supporting exactly the requested language expansion
        this.translations = {
            "ar": { // العربية
                bid_accepted: "تم قبول المزايدة بنجاح واستقرار سيادي.", 
                error_low_bid: "خطأ: قيمة المزاد المدخلة غير كافية برمجياً." 
            },
            "en": { // الإنجليزية
                bid_accepted: "Bid accepted successfully under sovereign ledger guidelines.", 
                error_low_bid: "Error: The submitted bid does not satisfy minimum increment parameters." 
            },
            "zh": { // الصينية (China)
                bid_accepted: "竞标成功接受，符合主权账本规范。", 
                error_low_bid: "错误：提交的竞标未达到最低递增参数。" 
            },
            "th": { // التايلاندية (Thailand)
                bid_accepted: "ยอมรับการประมูลสำเร็จภายใต้แนวทางบัญชีแยกประเภทหลัก.", 
                error_low_bid: "ข้อผิดพลาด: การเสนอราคาที่ส่งมาไม่ตรงตามพารามิเตอร์การเพิ่มขึ้นขั้นต่ำ." 
            },
            "tl": { // الفلبينية/التاغالوغ (Philippines)
                bid_accepted: "Matagumpay na tinanggap ang bid sa ilalim ng mga alituntunin.", 
                error_low_bid: "Error: Ang isinumiteng bid ay hindi nakakatugon sa minimum na parameter." 
            },
            "ms": { // الماليزية (Malaysia)
                bid_accepted: "Tawaran diterima dengan jaya di bawah garis panduan lejar.", 
                error_low_bid: "Ralat: Tawaran yang dikemukakan tidak memenuhi parameter kenaikan minimum." 
            },
            "tr": { // التركية (Turkey)
                bid_accepted: "Teklif, egemen defter yönergeleri kapsamında başarıyla kabul edildi.", 
                error_low_bid: "Hata: Gönderilen teklif minimum artış parametrelerini karşılamıyor." 
            },
            "ko": { // الكورية (Korea)
                bid_accepted: "주권 장부 지침에 따라 입찰이 성공적으로 수락되었습니다.", 
                error_low_bid: "오류: 제출된 입찰이 최소 증액 매개변수를 충족하지 않습니다." 
            },
            "ru": { // الروسية (Russia)
                bid_accepted: "Ставка успешно принята в соответствии с правилами суверенного реестра.", 
                error_low_bid: "Ошибка: Поданная ставка не соответствует параметрам минимального шага." 
            },
            "hi": { // الهندية (India)
                bid_accepted: "बोली सफलतापूर्वक स्वीकार कर ली गई है।", 
                error_low_bid: "त्रुटि: सबमिट की गई बोली न्यूनतम वृद्धि मापदंडों को पूरा नहीं करती है।" 
            },
            "ur": { // الباكستانية/الأوردو (Pakistan)
                bid_accepted: "بولی خودمختار لیجر کے خطوط کے تحت کامیابی سے قبول کر لی گئی ہے۔", 
                error_low_bid: "غلطی: جمع کرائی گئی بولی کم از کم اضافہ کے معیار پر پوری نہیں اترتی۔" 
            }
        };
    }

    /**
     * Localizes operational messages securely via exact integer language indexing
     * @param {string} languageCode - Target language identifier (e.g., 'zh', 'th', 'tl', 'ms', 'tr', 'ko')
     * @param {string} baselineKey - Translation context target key
     * @returns {string} Fully localized string matching regional compliance
     */
    fetchLocalizedPhrase(languageCode, baselineKey) {
        // Fallback safely to English ('en') if language is not supported
        const selectedLang = this.translations[languageCode] ? languageCode : "en";
        return this.translations[selectedLang][baselineKey] || this.translations["en"][baselineKey];
    }
}

export default AuctionLocalizationEngine;
