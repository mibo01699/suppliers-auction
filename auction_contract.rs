#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Env, Address, String, Vec, Map, Symbol, i128};

const AUCTION_STATUS_OPEN: Symbol = symbol_short!("OPEN");
const AUCTION_STATUS_CLOSED: Symbol = symbol_short!("CLOSED");
const AUCTION_STATUS_SETTLED: Symbol = symbol_short!("SETTLED");
const AUCTION_STATUS_DISPUTED: Symbol = symbol_short!("DISP");

#[contract]
pub struct AuctionContract;

#[contractimpl]
impl AuctionContract {
    /// إنشاء مزاد جديد
    pub fn create_auction(
        env: Env,
        seller: Address,
        description: String,
        starting_price: i128,      // السعر بالدولار (أو وحدة مرجعية)
        gcv_value: i128,           // قيمة GCV المتفق عليها
        pi_percentage: u32,        // نسبة الدفع بـ Pi (0-100)
        yer_percentage: u32,       // نسبة الدفع بـ YER
        deadline: u64,             // الطابع الزمني للإغلاق
    ) -> u64 {
        // التحقق من صحة النسب
        assert!(pi_percentage + yer_percentage == 100, "النسب يجب أن تساوي 100%");
        assert!(seller.address() != env.current_contract_address(), "البائع لا يمكن أن يكون العقد نفسه");

        // إنشاء معرف فريد للمزاد
        let auction_id = env.prng().u64();

        // تخزين بيانات المزاد
        let auction_data = Map::new(&env);
        auction_data.set(Symbol::new(&env, "status"), AUCTION_STATUS_OPEN);
        auction_data.set(Symbol::new(&env, "seller"), seller);
        auction_data.set(Symbol::new(&env, "description"), description);
        auction_data.set(Symbol::new(&env, "starting_price"), starting_price);
        auction_data.set(Symbol::new(&env, "gcv_value"), gcv_value);
        auction_data.set(Symbol::new(&env, "pi_percentage"), pi_percentage);
        auction_data.set(Symbol::new(&env, "yer_percentage"), yer_percentage);
        auction_data.set(Symbol::new(&env, "deadline"), deadline);
        auction_data.set(Symbol::new(&env, "highest_bid"), 0);
        auction_data.set(Symbol::new(&env, "highest_bidder"), Address::new(&env, [0; 32]));

        // تسجيل المزاد في الدفتر
        env.storage().persistent().set(&auction_id, &auction_data);
        
        auction_id
    }

    /// تقديم عرض
    pub fn place_bid(env: Env, auction_id: u64, bidder: Address, amount: i128) {
        let mut auction_data: Map<Symbol, i128> = env.storage().persistent().get(&auction_id).unwrap();
        
        // 1. التحقق من أن المزاد مفتوح
        let status: Symbol = auction_data.get(Symbol::new(&env, "status")).unwrap();
        assert!(status == AUCTION_STATUS_OPEN, "المزاد غير مفتوح");
        
        // 2. التحقق من أن المبلغ أعلى من آخر عرض
        let highest_bid: i128 = auction_data.get(Symbol::new(&env, "highest_bid")).unwrap();
        assert!(amount > highest_bid, "يجب أن يكون العرض أعلى من آخر عرض");
        
        // 3. تحديث أعلى عرض
        auction_data.set(Symbol::new(&env, "highest_bid"), amount);
        auction_data.set(Symbol::new(&env, "highest_bidder"), bidder);
        env.storage().persistent().set(&auction_id, &auction_data);
    }

    /// ترسية المزاد على الفائز
    pub fn finalize_auction(env: Env, auction_id: u64) {
        let mut auction_data: Map<Symbol, i128> = env.storage().persistent().get(&auction_id).unwrap();
        
        // 1. التأكد من انتهاء المهلة
        let deadline: u64 = auction_data.get(Symbol::new(&env, "deadline")).unwrap();
        assert!(env.ledger().timestamp() > deadline, "لم تنتهي مهلة المزاد");
        
        // 2. التأكد من وجود عروض
        let highest_bid: i128 = auction_data.get(Symbol::new(&env, "highest_bid")).unwrap();
        assert!(highest_bid > 0, "لا توجد عروض");
        
        // 3. تحديث حالة المزاد إلى "مغلق"
        auction_data.set(Symbol::new(&env, "status"), AUCTION_STATUS_CLOSED);
        env.storage().persistent().set(&auction_id, &auction_data);
        
        // 4. استدعاء عقد الدفع (سيتم تنفيذه في خطوة منفصلة)
        // self.settle_auction(env, auction_id);
    }
}