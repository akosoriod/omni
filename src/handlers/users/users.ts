import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda";
import { DatabaseConnection } from "../../helpers/databaseHelper";
import { getResponse } from "../../helpers/lambdaHelper";



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const username = event?.pathParameters?.username || '';
        const query = `SELECT * FROM userssss`;
        DatabaseConnection.ejecutarQuery(query, (err: any, users: Object[]) => {
            if (err) {
                return getResponse({
                    statusCode: 400,
                    body: {
                        msg: 'Error',
                        error: err
                    }
                })
            } else {
                return getResponse({
                        statusCode: 200,
                        body: {
                            msg: 'successfull',
                            item: users
                        }
                    })
            }
        });
    
        return getResponse({
            statusCode: 200,
            body: {
                query
            }
        })
    } catch (error) {
        return getResponse({ error })
    }

}
   /* DatabaseConnection.ejecutarQuery(query, (err: any, users: Object[]) => {
        if (err) {
            resolve(getResponse({
                statusCode: 400,
                body: {
                    msg: 'Error',
                    error: err
                }
            })
            )
        } else {
            resolve(
                getResponse({
                    statusCode: 200,
                    body: {
                        msg: 'successfull',
                        item: users
                    }
                })
            )
        }
    });

});*/
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
