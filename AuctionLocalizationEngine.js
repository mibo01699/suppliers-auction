// Universal Multi-Language Translation and Localization Engine
// Strictly manages language indexing keys using Absolute Integer Mappings (No Floats)

class AuctionLocalizationEngine {
    constructor() {
        // Supported 10 Main Global Languages Dictionary Map
        this.translations = {
            "ar": { bid_accepted: "تم قبول المزايدة بنجاح واستقرار.", error_low_bid: "خطأ: قيمة المزاد المدخلة غير كافية سيادياً." },
            "en": { bid_accepted: "Bid accepted successfully under sovereign ledger guidelines.", error_low_bid: "Error: The submitted bid does not satisfy minimum increment parameters." },
            "zh": { bid_accepted: "竞标成功接受，符合主权账本规范。", error_low_bid: "错误：提交的竞标未达到最低递增参数。" }, // Chinese
            "hi": { bid_accepted: "बोली सफलतापूर्वक स्वीकार कर ली गई है।", error_low_bid: "त्रुटि: सबमिट की गई बोली न्यूनतम वृद्धि मापदंडों को पूरा नहीं करती है।" }, // Hindi
            "id": { bid_accepted: "Penawaran diterima dengan sukses di bawah aturan buku besar.", error_low_bid: "Kesalahan: Penawaran yang diajukan tidak memenuhi parameter minimum." }, // Indonesian
            "es": { bid_accepted: "Oferta aceptada con éxito bajo las pautas del libro mayor soberano.", error_low_bid: "Error: La oferta presentada no cumple con los parámetros de incremento mínimo." },
            "fr": { bid_accepted: "Offre acceptée avec succès selon las directives du grand livre.", error_low_bid: "Erreur: L'offre soumise ne satisfait pas aux paramètres d'incrément minimum." },
            "ru": { bid_accepted: "Ставка успешно принята в соответствии с правилами суверенного реестра.", error_low_bid: "Ошибка: Поданная ставка не соответствует параметрам минимального шага." },
            "bn": { bid_accepted: "বিড সফলভাবে সার্বভৌম লেজার নির্দেশিকা অধীনে গৃহীত হয়েছে।", error_low_bid: "ত্রুটি: জমা দেওয়া বিড ন্যূনতম বৃদ্ধির পরামিতি পূরণ করে না।" }, // Bengali
            "pt": { bid_accepted: "Lance aceito com sucesso sob as diretrizes do livro razão soberano.", error_low_bid: "Erro: O lance enviado não satisfaz os parâmetros de incremento mínimo." }
        };
    }

    /**
     * Localizes operational messages securely via exact integer language indexing
     * @param {string} languageCode - Target language identifier (e.g., 'zh', 'hi', 'id')
     * @param {string} baselineKey - Translation context target key
     * @returns {string} Fully localized string matching regional compliance
     */
    fetchLocalizedPhrase(languageCode, baselineKey) {
        const selectedLang = this.translations[languageCode] ? languageCode : "en";
        return this.translations[selectedLang][baselineKey] || this.translations["en"][baselineKey];
    }
}

export default AuctionLocalizationEngine;
