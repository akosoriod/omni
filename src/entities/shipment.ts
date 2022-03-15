import { IShipment } from "../interfaces/IShipment";
import { pool } from "../helpers/databaseHelper";
import { Notification } from "./notification";
import { getValue,affectedRows } from "../helpers/utilsHelper";
import { INotification } from "../interfaces/INotification";


const TableName = process.env.TABLE_NAME || "";
const RosterApi = process.env.ROSTER_API || "";

export class Shipment implements IShipment {
    status: string;
    date: string;

    constructor(props: IShipment) {
        this.status = props.status;
        this.date = props.date;
    }

    create = async (): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('INSERT INTO `shipment` (`status`,`date`) VALUES (?,?)',
                [
                    this.status,
                    this.date,
                ]);
            return {msg:"Shipment created"};
        } catch (error) {
            return { error: error }
        }
    }
    edit = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('UPDATE `shipment` SET `status` = ?, `date` = ? WHERE (`id` = ?)',
                [this.status,
                this.date,
                    id
                ]);
            if(this.status == "sent"){
                const rows = await promisePool.execute('SELECT o.user_id  FROM `shipment` s join `order_product` op on op.shipment_id=s.id join `order` o on o.id=op.order_id ',[])
                const userId = await getValue(rows,'user_id')
                const params:INotification = {user_id:userId, shipment_id:+id, detail:"your order has been shipped"}
                console.log(params);
                const notification = new Notification({user_id:userId, shipment_id:+id, detail:"your order has been shipped"});
                notification.create();
            }
            if(await affectedRows(rows)){
              return {msg:"Shipment updated"};
            }else{
              return {msg:"Shipment failed to update"};
            }
        } catch (error) {
            return { error: error }
        }
    }
    static getShipment = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('SELECT * FROM `shipment` WHERE (`id` = ?)', [id]);
            return rows[0];
        } catch (error) {
            return { error: error }
        }
    }
    static delete = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('DELETE FROM `shipment` WHERE (`id` = ?)', [id]);
            console.log(rows[0]);
            return {msg:"Shipment deleted"};
        } catch (error) {
            return { error: error }
        }
    }

    static getShipments = async (start: string, number: string): Promise<any> => {

        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('SELECT shipment.id, shipment.status, order_product.order_id, order_product.product_id, order_product.shipment_id, order_product.quantity, order_product.price FROM `shipment` s JOIN `order_product` ON order_product.shipment_id=shipment.id LIMIT ?,?', [start, number]);
            return rows[0];
        } catch (error) {
            return { error: error }
        }
    }
}

