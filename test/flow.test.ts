import { getResponseValue } from "../src/helpers/utilsHelper";
import { agent as request } from 'supertest';

beforeEach(() => {
  jest.resetModules();
});

let tag = "";

const userInput = {
  email: "test@example.com",
  name: "Jane Doe",
  address: "3232 AV23",
  password: "Password123"
};
const product1Input = {
  "name": "Headset x33",
  "price": '180'
}
const product2Input = {
  "name": "Webcam HD 1080p",
  "price": '220'
}
const orderInput = {
  "user_id": 0,
  "status": "new",
  "products": [
    {
      "id": 1,
      "quantity": 3
    },
    {
      "id": 2,
      "quantity": 2
    }
  ]
}
const paymentInput = {
  "status": "pending",
  "payment_method": "cash",
  "amount": "150",
  "order_id":1
}
const shipmentInput = {
  "status": "rest",
  "date": "2022-04-14 23:30:00",
  "order_id":0
}
const order_total= +product1Input.price * orderInput.products[0].quantity + +product2Input.price * orderInput.products[1].quantity
const url = "https://aqv74ub64f.execute-api.us-east-1.amazonaws.com/prod";
let order_id = 0;
//BasicSuccess - All data rules correct
describe('API-USERS-A', () => {

  test('001 - Create a new user and check with get user', async () => {


    const responsePost = await request(url).post('/v1/users/new').send(userInput);
    //Then the status code returned from server is 201
    expect(responsePost.status).toStrictEqual(201);
    // No errors
    expect(responsePost.error).toEqual(false);
    const responseGet = await request(url).get('/v1/users/' + responsePost.body.user[0].id);
    delete responseGet.body.user[0].id
    //comparate jsons
    expect(userInput).toEqual(responseGet.body.user[0]);


  });

  test('002 - Create products and check with get ', async () => {

    const responsePost = await request(url).post('/v1/products/new').send(product1Input);
    //Then the status code returned from server is 201
    expect(responsePost.status).toStrictEqual(201);
    // No errors
    expect(responsePost.error).toEqual(false);
    console.log(responsePost.body);
    const responseGet = await request(url).get('/v1/products/' + responsePost.body.product[0].id);
    delete responseGet.body.product[0].id
    //comparate jsons
    expect(product1Input).toEqual(responseGet.body.product[0]);

    const responsePost2 = await request(url).post('/v1/products/new').send(product2Input);
    //Then the status code returned from server is 201
    expect(responsePost2.status).toStrictEqual(201);
    //No error
    expect(responsePost2.error).toEqual(false);
    const responseGet2 = await request(url).get('/v1/products/' + responsePost2.body.product[0].id);//product
    delete responseGet2.body.product[0].id
    //comparate jsons
    expect(product2Input).toEqual(responseGet2.body.product[0]);

  });

  test('003 - Create order and check the flow', async () => {

    const responsePost = await request(url).post('/v1/orders/new').send(orderInput);
    //Then the status code returned from server is 201
    expect(responsePost.status).toStrictEqual(201);
    // No errors
    expect(responsePost.error).toEqual(false);
    console.log(responsePost.body);
    const responseGet = await request(url).get('/v1/orders/' + responsePost.body.order[0].id); //product
    order_id = responseGet.body.order[0].id
    delete responseGet.body.order[0].id
    //comparate jsons
    expect(order_total).toEqual(responseGet.body.order[0].total);
    
  });

  
  test('004 - Create payment and check ', async () => {
    paymentInput.order_id = order_id
    const responsePost = await request(url).post('/v1/payments/new').send(paymentInput);
    //Then the status code returned from server is 201
    expect(responsePost.status).toStrictEqual(201);
    // No errors
    expect(responsePost.error).toEqual(false);
    console.log(responsePost.body);
    const responseGet = await request(url).get('/v1/payments/' + responsePost.body.payment[0].id); //product
    delete responseGet.body.payment[0].id
    //comparate jsons
    expect(order_total).toEqual(responseGet.body.payment[0].total);
    
  });

  
  test('005 - Create shipment and check notification', async () => {
    shipmentInput.order_id = order_id
    const responsePost = await request(url).post('/v1/shipments/new').send(shipmentInput);
    //Then the status code returned from server is 201
    expect(responsePost.status).toStrictEqual(201);
    // No errors
    expect(responsePost.error).toEqual(false);
    console.log(responsePost.body);
    const responseGet = await request(url).get('/v1/shipments/' + responsePost.body.shipment[0].id); //product
    delete responseGet.body.shipment[0].id
    //comparate jsons
    expect(order_total).toEqual(responseGet.body.shipment[0].total);
    
  });
});