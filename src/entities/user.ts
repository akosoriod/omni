import { IUser } from "../interfaces/IUser";
import { pool } from "../helpers/databaseHelper";
import { getResponseValue } from "../helpers/utilsHelper";


export class User implements IUser {
    name: string;
    email: string;
    address: string;
    password: string;

    constructor(props: IUser) {
        this.name = props.name;
        this.email = props.email;
        this.address = props.address;
        this.password = props.password;
    }

    create = async (): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('INSERT INTO `user` (`name`,`email`,`address`,`password`) VALUES (?,?,?,?)',
                [
                    this.name,
                    this.email,
                    this.address,
                    this.password
                ]);
            if (await getResponseValue(rows, "affectedRows") == 1) {
                return await User.getUser(await getResponseValue(rows, "insertId"));
            } else {
                return { msg: "User failed to create" };
            }
        } catch (error) {
            return { error: error }
        }
    }
    edit = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('UPDATE `user` SET `name` = ?, `email` = ?, `address` = ?, `password` = ? WHERE (`id` = ?)',
                [this.name,
                this.email,
                this.address,
                this.password,
                    id
                ]);
                if (await getResponseValue(rows, "affectedRows") == 1) {
                    return await User.getUser(await getResponseValue(rows, "insertId"));
                } else {
                    return { msg: "User failed to update" };
                }
        } catch (error) {
            return { error: error }
        }
    }
    static getUser = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('SELECT * FROM `user` WHERE (`id` = ?)', [id]);
            return rows[0];
        } catch (error) {
            return { error: error }
        }
    }
    static delete = async (id: string): Promise<any> => {
        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('DELETE FROM `user` WHERE (`id` = ?)', [id]);
            if (await getResponseValue(rows, "affectedRows") == 1) {
                return { msg: "User deleted" };
            } else {
                return { msg: "User failed to delete" };
            }
        } catch (error) {
            return { error: error }
        }
    }

    static getUsers = async (start: string, number: string): Promise<any> => {

        try {
            const promisePool = pool.promise();
            const rows = await promisePool.execute('SELECT * FROM `user` LIMIT ?,?', [start, number]);
            return rows[0];
        } catch (error) {
            return { error: error }
        }
    }
}

