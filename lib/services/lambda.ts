import * as path from "path";
import {NodejsFunction} from "@aws-cdk/aws-lambda-nodejs";
import {NodejsFunctionProps} from "@aws-cdk/aws-lambda-nodejs/lib/function";
import * as apiGateway from "@aws-cdk/aws-apigateway";
import {Resource} from "@aws-cdk/aws-apigateway/lib/resource";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import { MethodOptions } from "@aws-cdk/aws-apigateway";

const handlersDirectoryPath = path.join(__dirname, `./../../src/handlers/`);

const getFunctionsForSynth = (
    allLambdas: { [key: string]: () => NodejsFunction },
    onlySynth: string[]=[]
) => {
    let lambdasForSynth: { [key: string]: NodejsFunction } = {}

    if (onlySynth.length > 0) {
        onlySynth.forEach((functionKey: string) => {
            lambdasForSynth[functionKey] = allLambdas[functionKey]();
        })
    } else {
        Object.keys(allLambdas).forEach((functionKey: string) => {
            lambdasForSynth[functionKey] = allLambdas[functionKey]();
        })
    }

    return lambdasForSynth;
}

const addLambdaToRoute = (
    lambdaFunction: NodejsFunction,
    baseRoute: apiGateway.Resource,
    method: string,
) => {

    baseRoute.addMethod(
        method,
        new apiGateway.LambdaIntegration(lambdaFunction, {proxy: true})
    )
}

const addLambdaToNewRoute = (
    lambdaFunction: NodejsFunction,
    baseRoute: apiGateway.Resource,
    path: string,
    method: string
) => {
    const newRoute = baseRoute.addResource(path);

    addLambdaToRoute(
        lambdaFunction,
        newRoute,
        method
    )
}



export const getNodeLambdaFunction =
    (scope: cdk.Construct,
     functionName: string,
     handlerPathFromHandlers: string,
     env: any,
     remainingProps?: NodejsFunctionProps,
     routeConfig?: {
         baseRoute: apiGateway.Resource,
         method: string,
         path?: string,
     }
    ) => {
        const fixedEnvironmentVariables = {
            PROJECT_ENVIRONMENT: env.PROJECT_ENVIRONMENT
        }

        const lambdaFunction = new NodejsFunction(scope, functionName, {
            functionName: `${env.PROJECT_NAME}-V${env.PROJECT_VERSION}-${functionName}-${env.PROJECT_ENVIRONMENT}`,
            memorySize: remainingProps?.memorySize || 128,
            timeout: remainingProps?.timeout || cdk.Duration.seconds(60),
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: remainingProps?.handler || 'handler',
            entry: handlersDirectoryPath + handlerPathFromHandlers,
            environment: {...fixedEnvironmentVariables, ...remainingProps?.environment},
            bundling: {
                minify: true
            },
        })

        if (routeConfig) {
            if (routeConfig.path) {
                addLambdaToNewRoute(
                    lambdaFunction,
                    routeConfig.baseRoute,
                    routeConfig.path,
                    routeConfig.method
                );
            } else {
                addLambdaToRoute(
                    lambdaFunction,
                    routeConfig.baseRoute,
                    routeConfig.method
                )
            }

        }

        return lambdaFunction;
    }


export const getLambdas = (
    stack: cdk.Construct,
    env: any,
    opt: any
): { [key: string]: NodejsFunction } => {

    const signin = () => getNodeLambdaFunction(
        stack,
        "signin",
        "auth/signin.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.signinRoute, path: '', method: "POST"}
    );

    const logout = () => getNodeLambdaFunction(
        stack,
        "logout",
        "auth/logout.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.logoutRoute, path: '', method: "POST"},
    );
    const getNotification = () => getNodeLambdaFunction(
        stack,
        "getNotification",
        "notifications/getNotification.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.notificationRoute, path: '', method: "GET"}
    );

    const createNotification = () => getNodeLambdaFunction(
        stack,
        "createNotification",
        "notifications/createNotification.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.notificationRoute, path: '', method: "POST"},
    );
// Users
    const users = () => getNodeLambdaFunction(
        stack,
        "users",
        "users/users.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.usersRoute, path: '', method: "GET"}
    );

    const getUser = () => getNodeLambdaFunction(
        stack,
        "getUser",
        "users/getUser.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.userRoute, path: '', method: "GET"}
    );
    const createUser = () => getNodeLambdaFunction(
        stack,
        "createUser",
        "users/createUser.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.userRoute, path: '', method: "POST"}
    );
    const editUser = () => getNodeLambdaFunction(
        stack,
        "editUser",
        "users/editUser.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.userRoute, path: '', method: "PUT"}
    );
    const deleteUser = () => getNodeLambdaFunction(
        stack,
        "deleteUser",
        "users/deleteUser.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.userRoute, path: '', method: "DELETE"}
    );

// Orders
    const orders = () => getNodeLambdaFunction(
        stack,
        "orders",
        "orders/orders.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.ordersRoute, path: '', method: "GET"}
    );

    const getOrder = () => getNodeLambdaFunction(
        stack,
        "getOrder",
        "orders/getOrder.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.orderRoute, path: '', method: "GET"}
    );
    const createOrder = () => getNodeLambdaFunction(
        stack,
        "createOrder",
        "orders/createOrder.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.orderRoute, path: '', method: "POST"}
    );
    const editOrder = () => getNodeLambdaFunction(
        stack,
        "editOrder",
        "orders/editOrder.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.orderRoute, path: '', method: "PUT"}
    );
    const deleteOrder = () => getNodeLambdaFunction(
        stack,
        "deleteOrder",
        "orders/deleteOrder.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.orderRoute, path: '', method: "DELETE"}
    );

//  Products
    const products = () => getNodeLambdaFunction(
        stack,
        "products",
        "products/products.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.productsRoute, path: '', method: "GET"}
    );

    const getProduct = () => getNodeLambdaFunction(
        stack,
        "getProduct",
        "products/getProduct.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.productRoute, path: '', method: "GET"}
    );
    const createProduct = () => getNodeLambdaFunction(
        stack,
        "createProduct",
        "products/createProduct.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.productRoute, path: '', method: "POST"}
    );
    const editProduct = () => getNodeLambdaFunction(
        stack,
        "editProduct",
        "products/editProduct.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.productRoute, path: '', method: "PUT"}
    );
    const deleteProduct = () => getNodeLambdaFunction(
        stack,
        "deleteProduct",
        "products/deleteProduct.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.productRoute, path: '', method: "DELETE"}
    );

// Shipments
    const shipments = () => getNodeLambdaFunction(
        stack,
        "shipments",
        "shipments/shipments.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.shipmentsRoute, path: '', method: "GET"}
    );

    const getShipment = () => getNodeLambdaFunction(
        stack,
        "getShipment",
        "shipments/getShipment.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.shipmentRoute, path: '', method: "GET"}
    );
    const createShipment = () => getNodeLambdaFunction(
        stack,
        "createShipment",
        "shipments/createShipment.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.shipmentRoute, path: '', method: "POST"}
    );
    const editShipment = () => getNodeLambdaFunction(
        stack,
        "editShipment",
        "shipments/editShipment.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.shipmentRoute, path: '', method: "PUT"}
    );
    const deleteShipment = () => getNodeLambdaFunction(
        stack,
        "deleteShipment",
        "shipments/deleteShipment.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.shipmentRoute, path: '', method: "DELETE"}
    );

// Payments
    const payments = () => getNodeLambdaFunction(
        stack,
        "payments",
        "payments/payments.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.paymentsRoute, path: '', method: "GET"}
    );
    const getPayment = () => getNodeLambdaFunction(
        stack,
        "getPayment",
        "payments/getPayment.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.paymentRoute, path: '', method: "GET"}
    );
    const createPayment = () => getNodeLambdaFunction(
        stack,
        "createPayment",
        "payments/createPayment.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.paymentRoute, path: '', method: "POST"}
    );
    const editPayment = () => getNodeLambdaFunction(
        stack,
        "editPayment",
        "payments/editPayment.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.paymentRoute, path: '', method: "PUT"}
    );
    const deletePayment = () => getNodeLambdaFunction(
        stack,
        "deletePayment",
        "payments/deletePayment.ts",
        env,
        {
            environment: {
                TABLE_NAME: env.TABLE_NAME,
            }
        },
        {baseRoute: opt.routes.paymentRoute, path: '', method: "DELETE"}
    );

const allLambdas: { [key: string]: () => NodejsFunction } = {
        signin,
        logout,
        getNotification,
        createNotification,
        users,
        getUser,
        createUser,
        editUser,
        deleteUser,
        orders,
        getOrder,
        createOrder,
        editOrder,
        deleteOrder,
        products,
        getProduct,
        createProduct,
        editProduct,
        deleteProduct,
        payments,
        getPayment,
        createPayment,
        editPayment,
        deletePayment,
        shipments,
        getShipment,
        createShipment,
        editShipment,
        deleteShipment,

    };

    return getFunctionsForSynth(allLambdas, opt.onlySynth || []);

}