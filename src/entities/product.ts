import { IProduct } from "../interfaces/IProduct";
import { pool } from "../helpers/databaseHelper";
import { Notification } from "./notification";
import { INotification } from "../interfaces/INotification";
import { getResponseValue } from "../helpers/utilsHelper";


const TableName = process.env.TABLE_NAME || "";
const RosterApi = process.env.ROSTER_API || "";

export class Product implements IProduct {
    name: string;
    price: number;

    constructor(props: IProduct) {
        this.name = props.name;
        this.price = props.price;
    }

    create = async (): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('INSERT INTO `product` (`name`,`price`) VALUES (?,?)',
                [
                    this.name,
                    this.price,
                ]);
            if (await getResponseValue(rows, "affectedRows") == 1) {
                return await Product.getProduct(await getResponseValue(rows, "insertId"));
            } else {
                return { msg: "Product failed to create" };
            }
        } catch (error) {
            return { error: error }
        }
    }
    edit = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('UPDATE `product` SET `name` = ?, `price` = ? WHERE (`id` = ?)',
                [this.name,
                this.price,
                    id
                ]);
            if (await getResponseValue(rows, "affectedRows") == 1) {
                return await Product.getProduct(await getResponseValue(rows, "insertId"));
            } else {
                return { msg: "Product failed to update" };
            }
        } catch (error) {
            return { error: error }
        }
    }
    static getProduct = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('SELECT * FROM `product` WHERE (`id` = ?)', [id]);
            return rows[0];
        } catch (error) {
            return { error: error }
        }
    }
    static delete = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('DELETE FROM `product` WHERE (`id` = ?)', [id]);
            if (await getResponseValue(rows, "affectedRows") == 1) {
                return { msg: "Product deleted" };
            } else {
                return { msg: "Product failed to delete" };
            }
        } catch (error) {
            return { error: error }
        }
    }

    static getProducts = async (start: string, number: string): Promise<any> => {

        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('SELECT * FROM `product` LIMIT ?,?', [start, number]);
            return rows[0];
        } catch (error) {
            return { error: error }
        }
    }
}

