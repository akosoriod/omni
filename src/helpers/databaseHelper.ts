import { createConnection,Connection, MysqlError } from "mysql";

export  class DatabaseConnection {

    private static _instance: DatabaseConnection;

    cnn: Connection;

    conectado: boolean = false;

    constructor() {

        console.log('DB starting');

        this.cnn = createConnection({
            host: 'omni.cluster-crjgbytgvbtw.us-east-1.rds.amazonaws.com',
            user: 'admin',
            password: 'za7G*L%n8ngJ',
            database: 'omni'
        });

        this.conectarDB();
    }

    public static get instance(){
        return this._instance || ( this._instance = new this());
    }

    public static ejecutarQuery(query: string, callback: Function){

        this.instance.cnn.query(query, (err:any, results: Object[], fields:any) => {

            if(err){
                console.log('Error en la query');
                console.log(err);
                return callback(err);
            }

            if(results.length === 0){
                return callback('El registro solicitado no existe');
            }else{
                return callback(null, results);
            }

            return callback(null, results);

        });
    }

    private conectarDB() {
        this.cnn.connect((err: MysqlError) => {

            if (err) {
                console.log(err.message);
                return;
            }

            this.conectado = true;
            console.log('DB Online');

        })
    }


}