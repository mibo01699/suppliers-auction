/**
 * Arabian Eagle Ecosystem (A.E.C.) - Internationalization (i18n) Engine
 * نظام التبديل والتعرف التلقائي على لغات العالم لرواد شبكة Pi Network
 * المطور الرئيسي: مياس علي (Mayass Ali)
 */

const fs = require('fs');
const path = require('path');

class LanguageManager {
    constructor() {
        this.translations = {};
        this.defaultLanguage = 'en'; // اللغة الافتراضية في حال عدم توفر لغة المستخدم
        this.loadTranslations();
    }

    // تحميل ملف اللغات الشامل ديناميكياً
    loadTranslations() {
        const filePath = path.join(__dirname, 'translation.json');
        try {
            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                this.translations = JSON.parse(fileContent);
                console.log("[🌐 AEC i18n] تم تحميل حزم لغات العالم بنجاح 100%.");
            } else {
                console.log("[⚠️ AEC i18n] تحذير: ملف translation.json غير موجود، سيتم استخدام النصوص الافتراضية.");
            }
        } catch (error) {
            console.error("[❌ AEC i18n] خطأ أثناء قراءة ملف اللغات:", error);
        }
    }

    /**
     * تحديد وتطبيق اللغة تلقائياً بناءً على ترويسة المتصفح (Accept-Language)
     * أو لغة نظام المستخدم المستلمة من الـ API
     */
    detectAndGetTranslation(headerLang) {
        let targetLang = this.defaultLanguage;

        if (headerLang) {
            // استخراج أول لغتين من ترويسة المتصفح (مثل: ar-EG تصبح ar)
            const preferredLang = headerLang.split(',')[0].split('-')[0].trim().toLowerCase();
            
            // التحقق مما إذا كانت اللغة مدعومة في ملف الـ JSON الخاص بنا
            if (this.translations[preferredLang]) {
                targetLang = preferredLang;
            }
        }

        console.log(`[🌐 AEC i18n] تم اكتشاف لغة المستخدم تلقائياً: [${targetLang.toUpperCase()}]`);
        return {
            lang: targetLang,
            strings: this.translations[targetLang] || {}
        };
    }
}

module.exports = new LanguageManager();
