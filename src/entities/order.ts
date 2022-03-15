import { IOrder } from "../interfaces/IOrder";
import { pool } from "../helpers/databaseHelper";
import { Notification } from "./notification";
import { INotification } from "../interfaces/INotification";


const TableName = process.env.TABLE_NAME || "";
const RosterApi = process.env.ROSTER_API || "";

export class Order implements IOrder {
    user_id: number;
    status: string;
    total: number;

    constructor(props: IOrder) {
        this.user_id = props.user_id;
        this.status = props.status;
        this.total = props.total;
    }

    create = async (): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('INSERT INTO `order` (`user_id`,`status`,`total`) VALUES (?,?)',
                [
                    this.user_id,
                    this.status,
                    this.total,
                ]);
            return {msg:"Order created"};
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
                
            return {msg:"Order updated"};
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
            return {msg:"Order deleted"};
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

