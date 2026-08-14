// hybrid_payment_contract.rs - النسخة المحدثة المتوافقة مع النسب الحرة
use soroban_sdk::{contract, contractimpl, Env, Address, String};

#[contract]
pub struct HybridPaymentContract;

#[contractimpl]
impl HybridPaymentContract {
    /// تنفيذ التسوية الهجينة التوافقية بناءً على نسبة معطاة ديناميكياً
    /// total_amount: القيمة الإجمالية للعطاء مقومة بالوحدات الصغرى للعملة المحلية (10^10)
    /// gcv_rate: سعر صرف الـ Pi المتوافق عليه بقيمة GCV مقوم بالعملة المحلية
    /// pi_ratio_percentage: النسبة التوافقية المقبولة لـ Pi (0 - 100)
    pub fn settle_hybrid_deal(
        env: Env,
        buyer: Address,
        seller: Address,
        total_amount: i128,
        gcv_rate: i128,
        pi_ratio_percentage: u32,
    ) -> (i128, i128) {
        // 1. التحقق الصارم من صحة النسبة المئوية المتفق عليها
        if pi_ratio_percentage > 100 {
            panic!("Invalid percentage. Must be between 0 and 100.");
        }

        let ratio = pi_ratio_percentage as i128;
        let hundred = 100_i128;

        // 2. حساب حصة العملة المحلية المستقرة YER بناءً على النسبة التوافقية
        let yer_share = (total_amount * (hundred - ratio)) / hundred;
        
        // 3. حساب حصة الـ Pi المستهدفة (منع ثغرات التقريب بالتفاضل الجبري)
        let pi_share_in_currency = total_amount - yer_share;

        // 4. تحويل حصة العملة المقومة بالـ Pi إلى وحدات صغرى للبلوكشين (Stroops = 10^7)
        let pi_precision_multiplier = 10_000_000_i128;
        let mut required_pi_stroops = 0_i128;

        if pi_share_in_currency > 0 && gcv_rate > 0 {
            required_pi_stroops = (pi_share_in_currency * pi_precision_multiplier) / gcv_rate;
        }

        // 5. إطلاق أحداث التوثيق على البلوكشين (Events) لإخطار الـ SDK وخوادم المقاصة
        env.events().publish(
            (String::from_str(&env, "payment_settled"), buyer, seller),
            (yer_share, required_pi_stroops, ratio),
        );

        // إرجاع مخرجات التسوية (المبلغ بالعملة المحلية، المبلغ بوحدات الـ Pi Stroops)
        (yer_share, required_pi_stroops)
    }
}
