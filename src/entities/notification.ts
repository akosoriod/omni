import { INotification } from "../interfaces/INotification";
import { pool } from "../helpers/databaseHelper";



export class Notification implements INotification {
    user_id: number;
    shipment_id: number;
    detail: string;

    constructor(props: INotification) {
        this.user_id = props.user_id;
        this.shipment_id = props.shipment_id;
        this.detail = props.detail;
    }

    create = async (): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('INSERT INTO `notification` (`user_id`,`shipment_id`,`detail`) VALUES (?,?,?)',
                [
                    this.user_id,
                    this.shipment_id,
                    this.detail,         
               ]);
            return {msg:"Notification created"};
        } catch (error) {
            return { error: error }
        }
    }
    edit = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('UPDATE `notification` SET `user_id` = ?, `notification_id` = ?, `detail` = ? WHERE (`id` = ?)',
                [   
                    this.user_id,
                    this.shipment_id,
                    this.detail,
                    id
                ]);
            return {msg:"Notification updated"};
        } catch (error) {
            return { error: error }
        }
    }
    static getNotification = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('SELECT * FROM `notification` WHERE (`id` = ?)', [id]);
            return rows[0];
        } catch (error) {
            return { error: error }
        }
    }
    static delete = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('DELETE FROM `notification` WHERE (`id` = ?)', [id]);
            return {msg:"Notification deleted"};
        } catch (error) {
            return { error: error }
        }
    }

    static getNotifications = async (start: string, number: string): Promise<any> => {

        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('SELECT * FROM notification LIMIT ?,?', [start, number]);
            return rows[0];
        } catch (error) {
            return { error: error }
        }
    }
}

