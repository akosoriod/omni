import { Product } from "../entities/product";

export interface IOrder {
    id?:number;
    user_id: number;
    status: string;
    total?: number;
    products: Array<any>;
}
