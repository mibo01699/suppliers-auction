// tracking_contract.rs
#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Address, String, Vec, Map, Symbol, i128};

#[contract]
pub struct TrackingContract;

#[contractimpl]
impl TrackingContract {
    /// إنشاء سجل تتبع لشحنة جديدة
    pub fn create_tracking(
        env: Env,
        auction_id: u64,
        buyer: Address,
        seller: Address,
        destination: String,
    ) -> u64 {
        let tracking_id = env.prng().u64();
        let tracking_data = Map::new(&env);
        tracking_data.set(Symbol::new(&env, "auction_id"), auction_id);
        tracking_data.set(Symbol::new(&env, "buyer"), buyer);
        tracking_data.set(Symbol::new(&env, "seller"), seller);
        tracking_data.set(Symbol::new(&env, "destination"), destination);
        tracking_data.set(Symbol::new(&env, "status"), Symbol::new(&env, "CREATED"));
        
        // تخزين سجل التتبع
        env.storage().persistent().set(&tracking_id, &tracking_data);
        
        tracking_id
    }

    /// إضافة نقطة تتبع جديدة
    pub fn add_tracking_point(
        env: Env,
        tracking_id: u64,
        location: String,
        status: String,
        latitude: i128,
        longitude: i128,
        actor: Address,
    ) {
        let mut tracking_data: Map<Symbol, i128> = env.storage().persistent().get(&tracking_id).unwrap();
        
        // الحصول على قائمة نقاط التتبع الحالية أو إنشاء قائمة جديدة
        let mut points: Vec<Map<Symbol, i128>> = match tracking_data.get(Symbol::new(&env, "points")) {
            Some(p) => p,
            None => Vec::new(&env),
        };
        
        // إنشاء نقطة تتبع جديدة
        let new_point = Map::new(&env);
        new_point.set(Symbol::new(&env, "location"), location);
        new_point.set(Symbol::new(&env, "status"), status);
        new_point.set(Symbol::new(&env, "latitude"), latitude);
        new_point.set(Symbol::new(&env, "longitude"), longitude);
        new_point.set(Symbol::new(&env, "actor"), actor);
        new_point.set(Symbol::new(&env, "timestamp"), env.ledger().timestamp());
        
        // إضافة النقطة إلى القائمة وتحديث الحالة
        points.push_back(new_point);
        tracking_data.set(Symbol::new(&env, "points"), points);
        tracking_data.set(Symbol::new(&env, "status"), Symbol::new(&env, &status));
        
        env.storage().persistent().set(&tracking_id, &tracking_data);
    }
}