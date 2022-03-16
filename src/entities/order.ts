import { IOrder } from "../interfaces/IOrder";
import { pool } from "../helpers/databaseHelper";
import { Notification } from "./notification";
import { INotification } from "../interfaces/INotification";
import { getDate, getResponseValue, getRowsValue } from "../helpers/utilsHelper";
import { Shipment } from "./shipment";

const DB_PASSWORD = process.env.DB_PASSWORD || "nada entity";

interface product {
    id: string,
    quantity: number,
    price: number,
}
export class Order implements IOrder {
    user_id: number;
    status: string;
    products: product[];
    constructor(props: IOrder) {
        this.user_id = props.user_id;
        this.status = props.status;
        this.products = props.products;
    }

    create = async (): Promise<any> => {
        console.log(DB_PASSWORD);
        try {
            let total:number = 0;
            const promisePool = pool.promise();
            const rows = await promisePool.execute('INSERT INTO `order` (`user_id`,`status`) VALUES (?,?)',
                [
                    this.user_id,
                    this.status
                ]);
            if (await getResponseValue(rows, "affectedRows") == 1) {
                const order_id = await getResponseValue(rows, "insertId")
                for (let product of this.products) {
                    const rows2 = await promisePool.execute('SELECT price FROM `product` WHERE (`id` = ?)', [product.id]);
                    let price:number = await getRowsValue(rows2, 'price')
                    if (product.quantity > 1) {
                        price = +price * +product.quantity;
                    }

                    await promisePool.execute('INSERT INTO `order_product` (`order_id`,`product_id`,`quantity`,`price`) VALUES (?,?,?,?)',
                        [
                            order_id,
                            product.id,
                            product.quantity,
                            price,
                        ]);
                    total = +total + price;
                }
                const ship = new Shipment({status:"New",date:await getDate()}).create();
                const shipment_id = await getResponseValue(ship, "id");
                console.log(ship);
                console.log(shipment_id);
                await promisePool.execute('UPDATE `order` SET shipment_id = ?,`total` = ? WHERE (`id` = ?)',
                    [
                        shipment_id,
                        total,
                        order_id
                    ]);
                return await Order.getOrder(order_id);
            } else {
                return { error: "Order failed to create" };
            }
        } catch (error) {
            return { error: error }
        }
    }
    edit = async (id: string): Promise<any> => {
        try {
            let total:number = 0;
            const promisePool = pool.promise();
            await promisePool.execute('DELETE FROM `order_product` WHERE (`order_id` = ?)', [id]);
            for (let product of this.products) {
                const rows2 = await promisePool.execute('SELECT price FROM `product` WHERE (`id` = ?)', [product.id]);
                let price:number = await getRowsValue(rows2, 'price')
                if (product.quantity > 1) {
                    price = +price * +product.quantity;
                }
                await promisePool.execute('INSERT INTO `order_product` (`order_id`,`product_id`,`quantity`,`price`) VALUES (?,?,?,?)',
                    [
                        id,
                        product.id,
                        product.quantity,
                        price,
                    ]);
                total = +total + price;
            }
            const rows = await promisePool.execute('UPDATE `order` SET `user_id` = ?, `status` = ?, `total` = ? WHERE (`id` = ?)',
                [
                    this.user_id,
                    this.status,
                    total,
                    id
                ]);
            if (await getResponseValue(rows, "affectedRows") == 1) {
                return await Order.getOrder(id);
            } else {
                return { error: "Order failed to create" };
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
                return { error: "Order failed to delete" };
            }
        } catch (error) {
            return { error: error }
        }
    }

    static getOrders = async (start: string, number: string): Promise<any> => {

        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('SELECT o.id, o.status,u.name, op.order_id, op.product_id, op.order_id, op.quantity, op.price FROM `order` o JOIN order_product op on op.order_id=o.id JOIN user u on o.user_id=u.id LIMIT ?,?', [start, number]);
            return rows[0];
        } catch (error) {
            return { error: error }
        }
    }
}

