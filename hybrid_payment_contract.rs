// hybrid_payment_contract.rs - عقد Rust لترسية صفقات المزاد بالنسبة الإجمالية الحرّة المعتمدة
use soroban_sdk::{contract, contractimpl, Env, Address};

#[contract]
pub struct HybridPaymentContract;

#[contractimpl]
impl HybridPaymentContract {
    pub fn settle_hybrid_deal(
        env: Env,
        total_amount: i128,
        gcv_rate: i128,
        pi_ratio_percentage: u32,
    ) -> (i128, i128) {
        if pi_ratio_percentage > 100 { panic!("Invalid ratio percentage"); }

        let ratio = pi_ratio_percentage as i128;
        let yer_share = (total_amount * (100 - ratio)) / 100;
        let pi_share_currency = total_amount - yer_share;

        let mut required_pi_stroops = 0;
        if pi_share_currency > 0 && gcv_rate > 0 {
            required_pi_stroops = (pi_share_currency * 10_000_000) / gcv_rate;
        }

        (yer_share, required_pi_stroops)
    }
}
