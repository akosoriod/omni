import {IUser} from "../interfaces/IUser";
import { Connection } from "mysql";


const TableName = process.env.TABLE_NAME || "";
const RosterApi = process.env.ROSTER_API || "";

export class Organization implements IUser {
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


  /*  static create = (organizationName: string): Promise<DocumentClient.QueryOutput> =>
        new Promise((resolve, reject) => {
            {
                const paramsName: DocumentClient.QueryInput = {
                    "TableName": TableName,
                    "ScanIndexForward": true,
                    "IndexName": "LSI4",
                    "KeyConditionExpression": "#efee0 = :efee0 AND #efee1 = :efee1",
                    "ExpressionAttributeValues": {
                        ":efee0": "ORG",
                        ":efee1": organizationName,
                    },
                    "ExpressionAttributeNames": {
                        "#efee0": "PK",
                        "#efee1": "LSI4"
                    }
                };
                queryTableDynamo(paramsName)
                    .then((results) => resolve(results))
                    .catch((error) => reject(error))
            }
        })
*/

}