// ============================================================
// الملف: frontend/app.js
// الدور: التحكم في منطق التطبيق والتواصل مع الخادم الخلفي
// ============================================================

const API_BASE_URL = 'http://localhost:5000/api'; // عنوان الخادم الخلفي

// ============================================================
// دوال المزادات
// ============================================================

/**
 * إنشاء مزاد جديد
 */
async function createAuction(seller, description, startingPrice, gcvValue, piPercent, yerPercent, deadline) {
    try {
        const response = await fetch(`${API_BASE_URL}/auction/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ seller, description, startingPrice, gcvValue, piPercent, yerPercent, deadline })
        });
        const data = await response.json();
        console.log('تم إنشاء المزاد:', data);
        alert(`تم إنشاء المزاد برقم: ${data.auctionId}`);
        return data;
    } catch (error) {
        console.error('خطأ في إنشاء المزاد:', error);
        alert('فشل في إنشاء المزاد');
    }
}

/**
 * تقديم عرض في مزاد
 */
async function placeBid(auctionId, bidder, amount) {
    try {
        const response = await fetch(`${API_BASE_URL}/auction/bid`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ auctionId, bidder, amount })
        });
        const data = await response.json();
        console.log('تم تقديم العرض:', data);
        alert(`تم تقديم العرض بقيمة ${amount}`);
        return data;
    } catch (error) {
        console.error('خطأ في تقديم العرض:', error);
        alert('فشل في تقديم العرض');
    }
}

/**
 * ترسية المزاد
 */
async function finalizeAuction(auctionId) {
    try {
        const response = await fetch(`${API_BASE_URL}/auction/finalize`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ auctionId })
        });
        const data = await response.json();
        console.log('تم ترسية المزاد:', data);
        alert(`تم ترسية المزاد ${auctionId}`);
        return data;
    } catch (error) {
        console.error('خطأ في ترسية المزاد:', error);
        alert('فشل في ترسية المزاد');
    }
}

// ============================================================
// دوال الدفع الهجين
// ============================================================

/**
 * تنفيذ الدفع الهجين (Pi + YER)
 */
async function settlePayment(buyer, seller, totalAmount, piAmount, yerAmount, auctionId) {
    try {
        const response = await fetch(`${API_BASE_URL}/payment/settle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ buyer, seller, totalAmount, piAmount, yerAmount, auctionId })
        });
        const data = await response.json();
        console.log('تم تنفيذ الدفع الهجين:', data);
        alert(`تم تنفيذ الدفع الهجين للمزاد ${auctionId}`);
        return data;
    } catch (error) {
        console.error('خطأ في تنفيذ الدفع الهجين:', error);
        alert('فشل في تنفيذ الدفع الهجين');
    }
}

// ============================================================
// دوال التتبع
// ============================================================

/**
 * إنشاء سجل تتبع للشحنة
 */
async function createTracking(auctionId, buyer, seller, destination) {
    try {
        const response = await fetch(`${API_BASE_URL}/tracking/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ auctionId, buyer, seller, destination })
        });
        const data = await response.json();
        console.log('تم إنشاء سجل التتبع:', data);
        alert(`تم إنشاء سجل التتبع برقم: ${data.trackingId}`);
        return data;
    } catch (error) {
        console.error('خطأ في إنشاء سجل التتبع:', error);
        alert('فشل في إنشاء سجل التتبع');
    }
}

/**
 * إضافة نقطة تتبع جديدة
 */
async function addTrackingPoint(trackingId, location, status, latitude, longitude, actor) {
    try {
        const response = await fetch(`${API_BASE_URL}/tracking/add-point`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trackingId, location, status, latitude, longitude, actor })
        });
        const data = await response.json();
        console.log('تم إضافة نقطة تتبع:', data);
        alert(`تم إضافة نقطة تتبع للشحنة ${trackingId}`);
        return data;
    } catch (error) {
        console.error('خطأ في إضافة نقطة تتبع:', error);
        alert('فشل في إضافة نقطة تتبع');
    }
}

/**
 * الحصول على معلومات التتبع
 */
async function getTrackingInfo(trackingId) {
    try {
        const response = await fetch(`${API_BASE_URL}/tracking/${trackingId}`);
        const data = await response.json();
        console.log('معلومات التتبع:', data);
        return data;
    } catch (error) {
        console.error('خطأ في الحصول على معلومات التتبع:', error);
        alert('فشل في الحصول على معلومات التتبع');
    }
}

// ============================================================
// دوال KYB
// ============================================================

/**
 * تسجيل كيان تجاري جديد
 */
async function registerEntity(entityName, entityType, piWallet, documentsHash, adminWallet) {
    try {
        const response = await fetch(`${API_BASE_URL}/kyb/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entityName, entityType, piWallet, documentsHash, adminWallet })
        });
        const data = await response.json();
        console.log('تم تسجيل الكيان التجاري:', data);
        alert(`تم تسجيل الكيان التجاري برقم: ${data.entityId}`);
        return data;
    } catch (error) {
        console.error('خطأ في تسجيل الكيان التجاري:', error);
        alert('فشل في تسجيل الكيان التجاري');
    }
}

/**
 * منح صلاحية لمستخدم ضمن كيان تجاري
 */
async function grantRole(entityId, userPiWallet, role, granterPiWallet) {
    try {
        const response = await fetch(`${API_BASE_URL}/kyb/grant-role`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entityId, userPiWallet, role, granterPiWallet })
        });
        const data = await response.json();
        console.log('تم منح الصلاحية:', data);
        alert(`تم منح دور ${role} للمستخدم`);
        return data;
    } catch (error) {
        console.error('خطأ في منح الصلاحية:', error);
        alert('فشل في منح الصلاحية');
    }
}