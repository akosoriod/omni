import { Product } from "../src/entities/product";
import { User } from "../src/entities/user";
import { IUser } from "../src/interfaces/IUser";
import { pool } from "../src/helpers/databaseHelper";
import { IProduct } from "../src/interfaces/IProduct";
import { Order } from "../src/entities/order";
import { getResponseValue } from "../src/helpers/utilsHelper";


const userInput = {
  email: "test@example.com",
  name: "Jane Doe",
  address: "3232 AV23",
  password: "Password123"
};
const product1Input = {
  "name": "Headset x33",
  "price": 180
}
const product2Input = {
  "name": "Webcam HD 1080p",
  "price": 220
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
const Total_oden = product1Input.price*orderInput.products[0].quantity + product2Input.price*orderInput.products[1].quantity;
 
/*
test('001 - FlowTest', () => {
  const user = new User(userInput).create();
  console.log(user);
  const user_id:any =  getResponseValue(user, "id");
  const product1 = new Product(product1Input).create();
  const product1_id:any =  getResponseValue(product1, "id");
  const product2 = new Product(product2Input).create();
  const product2_id:any =  getResponseValue(product2, "id");
  orderInput.user_id = user_id
  orderInput.products[0].id = product1_id;
  orderInput.products[1].id = product2_id;
  const order = new Order(orderInput).create();
  const order_id =  getResponseValue(order, "id");
  const promisePool = pool.promise();
  const totalQuery =  promisePool.execute('SELECT total FROM `order` WHERE (`id` = ?)', [order_id]);
  const total:any =  getResponseValue(totalQuery, "total")
   expect(total==Total_oden).toBe(true);
});
*/