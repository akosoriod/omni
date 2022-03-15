import { IPayment } from "../interfaces/IPayment";
import { pool } from "../helpers/databaseHelper";
import { Notification } from "./notification";
import { INotification } from "../interfaces/INotification";
import { Shipment } from "./shipment";
import { getResponseValue } from "../helpers/utilsHelper";


const TableName = process.env.TABLE_NAME || "";
const RosterApi = process.env.ROSTER_API || "";

export class Payment implements IPayment {
    status: string;
    payment_method: string;
    amount: number;
    order_id: number;

    constructor(props: IPayment) {
        this.status = props.status;
        this.payment_method = props.payment_method;
        this.amount = props.amount
        this.order_id = props.order_id
    }

    create = async (): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('INSERT INTO `payment` (`status`,`payment_method`,`amount`) VALUES (?,?,?)',
                [
                    this.status,
                    this.payment_method,
                    this.amount,
                ]);

            if (await getResponseValue(rows, "affectedRows") == 1) {
                const payment_id = await getResponseValue(rows, "insertId")
                await promisePool.execute('INSERT INTO `order_payment` (`order_id`,`payment_id`) VALUES (?,?)',
                    [
                        this.order_id,
                        payment_id,
                    ]);
                return await Payment.getPayment(await getResponseValue(rows, "insertId"));
            } else {
                return { msg: "Payment failed to create" };
            }
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
            if (await getResponseValue(rows, "affectedRows") == 1) {
                return await Payment.getPayment(await getResponseValue(rows, "insertId"));
            } else {
                return { msg: "Payment failed to update" };
            }
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
            if (await getResponseValue(rows, "affectedRows") == 1) {
                return { msg: "Payment deleted" };
            } else {
                return { msg: "Payment failed to delete" };
            }
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

