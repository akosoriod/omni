import { IOrder } from "../interfaces/IOrder";
import { pool } from "../helpers/databaseHelper";
import { Notification } from "./notification";
import { INotification } from "../interfaces/INotification";
import { getResponseValue } from "../helpers/utilsHelper";


const TableName = process.env.TABLE_NAME || "";
const RosterApi = process.env.ROSTER_API || "";
interface product {
    id: string,
    quantity: number,
    price: number,
}
export class Order implements IOrder {
    user_id: number;
    status: string;
    products: product[];
    total: number ;
    constructor(props: IOrder) {
        this.user_id = props.user_id;
        this.status = props.status;
        this.products = props.products;
        this.total = 0;
    }

    create = async (): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('INSERT INTO `order` (`user_id`,`status`) VALUES (?,?)',
                [
                    this.user_id,
                    this.status
                ]);
            if (await getResponseValue(rows, "affectedRows") == 1) {
                const order_id = await getResponseValue(rows, "insertId")
                for (let product of this.products) {
                    if (product.quantity > 1) {
                        product.price = product.price * product.quantity;
                    }
                    await promisePool.execute('INSERT INTO `order_product` (`order_id`,`product_id`,`quantity`,`price`) VALUES (?,?)',
                        [
                            order_id,
                            product.id,
                            product.quantity,
                            product.price,
                        ]);
                    this.total = this.total + product.price;
                }
                this.edit(order_id)
                return await Order.getOrder(order_id);
            } else {
                return { msg: "Order failed to create" };
            }
        } catch (error) {
            return { error: error }
        }
    }
    edit = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('UPDATE `order` SET `user_id` = ?, `status` = ?, `total` = ? WHERE (`id` = ?)',
                [
                    this.user_id,
                    this.status,
                    this.total,
                    id
                ]);
            if (await getResponseValue(rows, "affectedRows") == 1) {
                return await Order.getOrder(await getResponseValue(rows, "insertId"));
            } else {
                return { msg: "Order failed to create" };
            }
        } catch (error) {
            return { error: error }
        }
    }
    static getOrder = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('SELECT * FROM `order` WHERE (`id` = ?)', [id]);
            return rows[0];
        } catch (error) {
            return { error: error }
        }
    }
    static delete = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('DELETE FROM `order` WHERE (`id` = ?)', [id]);
            if (await getResponseValue(rows, "affectedRows") == 1) {
                return { msg: "Order deleted" };
            } else {
                return { msg: "Order failed to delete" };
            }
        } catch (error) {
            return { error: error }
        }
    }

    static getOrders = async (start: string, number: string): Promise<any> => {

        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('SELECT s.id, s.status, op.order_id, op.product_id, op.order_id, op.quantity, op.price FROM `order` s join order_product op on op.order_id=s.id LIMIT ?,?', [start, number]);
            return rows[0];
        } catch (error) {
            return { error: error }
        }
    }
}

