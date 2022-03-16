export interface IPayment {
    id?:number;
    status: string;
    payment_method: string;
    amount: number;
    order_id: number;
}
