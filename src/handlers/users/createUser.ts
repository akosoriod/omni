import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda";
import { DatabaseConnection } from "../../helpers/databaseHelper";
import { getResponse } from "../../helpers/lambdaHelper";


export const handler: APIGatewayProxyHandler = (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => new Promise((resolve, reject) => {
    // const id: string = event.pathParameters?.['id'] || '';
    const query = ` SELECT *
                    FROM user`;

    DatabaseConnection.ejecutarQuery(query, (err: any, user: Object[]) => {
        if (err) {
            return getResponse({
                statusCode: 400,
                body: {
                    msg: 'Error',
                    error: err
                }
            })
            }else {
                return getResponse({
                    statusCode: 200,
                    body: {
                        msg: 'successfull',
                        item: user
                    }
                })
            }
    });

});
  /* 
return getResponse({
      statusCode: 200,
      body: {
          msg:'Tested',
          item:res
      }
  })
  
  

});
const query = `
SELECT *
FROM heroes`;

MySQL.ejecutarQuery(query, (err:any, heroes: Object[]) => {
  if(err){
      res.status(400).json({
          ok: false,
          err: {
              err
          }
      })
  }else{
      res.json({
          ok:true,
          heroes
      });
  }
});

});


const escapedID = MySQL.instance.cnn.escape(id);

const query = `
SELECT *
FROM heroes
WHERE ID =${escapedID}`;

MySQL.ejecutarQuery(query, (err:any, heroe: Object[]) => {
  if(err){
      res.status(400).json({
          ok: false,
          err: {
              err
          }
      })
  }else{
      res.json({
          ok:true,
          heroe: heroe[0]
      });
  }
});
*/
