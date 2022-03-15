import { IUser } from "../interfaces/IUser";
import { pool } from "../helpers/databaseHelper";


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
            return {msg:"User created"};
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
            return {msg:"User updated"};
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
            return {msg:"User deleted"};
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

