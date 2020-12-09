type BaseOrder = {
    time: string,
    product_id: string,
    sequence: number,
    side: string
};

export type Received = BaseOrder & {
    order_id: string,
    order_type: string,
    funds?: number,
    size?: number,
    price?: number,
    remaining_size?: number
};

export type Open = BaseOrder & {
    order_id: string,
    price: number,
    remaining_size: number
};

export type Done = BaseOrder & {
    order_id: string,
    price?: number,
    remaining_size?: number,
    reason: string
};

export type Match = BaseOrder & {
    trade_id: string,
    maker_order_id: string,
    taker_order_id: string,
    price: number,
    size: number
};

export type Changed = BaseOrder & {
    order_id: string,
    new_size?: number,
    old_size?: number,
    new_funds?: number,
    old_funds?: number
};

export type Activated = {
    product_id: string,
    timestamp: string,
    user_id: string,
    profile_id: string,
    order_id: string,
    stop_type: string,
    side: string
    stop_price: number,
    size: number,
    funds: number,
    private: boolean
};