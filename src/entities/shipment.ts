import { IShipment } from "../interfaces/IShipment";
import { pool } from "../helpers/databaseHelper";
import { Notification } from "./notification";
import { getResponseValue, getRowsValue } from "../helpers/utilsHelper";



export class Shipment implements IShipment {
    status: string;
    date: string;
    order_id: number;
    constructor(props: IShipment) {
        this.status = props.status;
        this.date = props.date;
        this.order_id = props.order_id;
    }

    create = async (): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('INSERT INTO `shipment` (`status`,`date`,order_id) VALUES (?,?)',
                [
                    this.status,
                    this.date,
                    this.order_id
                ]);
            if (await getResponseValue(rows, "affectedRows") == 1) {
                const insertId = await getResponseValue(rows, "insertId")
                await promisePool.execute('UPDATE `order_product` SET shipment_id = ? WHERE (`order_id` = ?)',
                [
                    insertId,
                    this.order_id
                ]);
                return await Shipment.getShipment(insertId);
            } else {
                return { error: "Shipment failed to create" };
            }
        } catch (error) {
            return { error: error }
        }
    }
    edit = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows1 = await promisePool.execute('UPDATE `shipment` SET `status` = ?, `date` = ? WHERE (`id` = ?)',
                [this.status,
                this.date,
                    id
                ]);
            if (await getResponseValue(rows1, "affectedRows") == 1) {
                await promisePool.execute('UPDATE `order_product` SET shipment_id = ? WHERE (`order_id` = ?)',
                [
                    id,
                    this.order_id
                ]);
                if (this.status == "sent") {
                    const rows2 = await promisePool.execute('SELECT o.user_id  FROM `shipment` s join `order_product` op on op.shipment_id=s.id join `order` o on o.id=op.order_id ', [])
                    const userId = await getRowsValue(rows2, 'user_id')
                    const notification = new Notification({ user_id: userId, shipment_id: +id, detail: "Your order has been shipped" });
                    notification.create();
                }
                if (this.status == "received") {
                    const rows3 = await promisePool.execute('SELECT o.user_id  FROM `shipment` s join `order_product` op on op.shipment_id=s.id join `order` o on o.id=op.order_id ', [])
                    const userId = await getRowsValue(rows3, 'user_id')
                    const notification = new Notification({ user_id: userId, shipment_id: +id, detail: "You have received your order" });
                    notification.create();
                }
                return await Shipment.getShipment(id);
            } else {
                return { error: "Shipment failed to update" };
            }
        } catch (error) {
            return { error: error }
        }
    }
    static getShipment = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('SELECT s.id, s.status, u.name, op.order_id, op.product_id, op.shipment_id, op.quantity, op.price FROM `shipment` s JOIN `order_product` op ON op.shipment_id=s.id JOIN `order` o on op.order_id=o.id JOIN user u on o.user_id=u.id WHERE s.id = ?)', [id]);
            return rows[0];
        } catch (error) {
            return { error: error }
        }
    }
    static delete = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('DELETE FROM `shipment` WHERE (`id` = ?)', [id]);
            if (await getResponseValue(rows, "affectedRows") == 1) {
                return { msg: "Shipment deleted" };
            } else {
                return { error: "Shipment failed to deleted" };
            }
        } catch (error) {
            return { error: error }
        }
    }

    static getShipments = async (start: string, number: string): Promise<any> => {

        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('SELECT s.id, s.status, u.name, op.order_id, op.product_id, op.shipment_id, op.quantity, op.price FROM `shipment` s JOIN `order_product` op ON op.shipment_id=s.id JOIN `order` o on op.order_id=o.id JOIN user u on o.user_id=u.id LIMIT ?,?', [start, number]);
            return rows[0];
        } catch (error) {
            return { error: error }
        }
    }
}

