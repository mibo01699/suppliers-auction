const languageManager = require('./locales/languageManager');

// مسار استقبال طلبات واجهة المستخدم وتزويدها باللغة الصحيحة تلقائياً
app.get('/api/localization', (req, res) => {
    // قراءة لغة المتصفح تلقائياً من ترويسات الطلب (Request Headers)
    const userBrowserLang = req.headers['accept-language'];
    const localizationData = languageManager.detectAndGetTranslation(userBrowserLang);
    
    res.json(localizationData);
});
