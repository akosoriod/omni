import { IPayment } from "../interfaces/IPayment";
import { pool } from "../helpers/databaseHelper";
import { Notification } from "./notification";
import { INotification } from "../interfaces/INotification";


const TableName = process.env.TABLE_NAME || "";
const RosterApi = process.env.ROSTER_API || "";

export class Payment implements IPayment {
    status: string;
    payment_method: string;
    amount: number;

    constructor(props: IPayment) {
        this.status = props.status;
        this.payment_method = props.payment_method;
        this.amount = props.amount
    }

    create = async (): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('INSERT INTO `payment` (`status`,`payment_method`,`amount`) VALUES (?,?)',
                [
                    this.status,
                    this.payment_method,
                    this.amount,
                ]);
            return {msg:"Payment created"};
        } catch (error) {
            return { error: error }
        }
    }
    edit = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('UPDATE `payment` SET `status` = ?, `payment_method` = ?, `amount` = ? WHERE (`id` = ?)',
                [this.status,
                this.payment_method,
                this.amount,
                    id
                ]);
            return {msg:"Payment updated"};
        } catch (error) {
            return { error: error }
        }
    }
    static getPayment = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('SELECT * FROM `payment` WHERE (`id` = ?)', [id]);
            return rows[0];
        } catch (error) {
            return { error: error }
        }
    }
    static delete = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('DELETE FROM `payment` WHERE (`id` = ?)', [id]);
            return {msg:"Payment deleted"};
        } catch (error) {
            return { error: error }
        }
    }

    static getPayments = async (start: string, number: string): Promise<any> => {

        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('SELECT s.id, s.status, op.order_id, op.product_id, op.payment_id, op.quantity, op.price FROM `payment` s join order_product op on op.payment_id=s.id LIMIT ?,?', [start, number]);
            return rows[0];
        } catch (error) {
            return { error: error }
        }
    }
}

