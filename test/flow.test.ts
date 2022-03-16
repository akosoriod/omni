import { getResponseValue } from "../src/helpers/utilsHelper";
import { agent as request} from 'supertest';

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

const url = "https://65b6h28486.execute-api.us-east-1.amazonaws.com/prod/";

//BasicSuccess - All data rules correct
describe('API-POST-SIGNUP-A', () => {

    test('001 - Create a new user and organization with correct information', async () => {


        const response = await request(url).post('v1/users/new').send(userInput);

        //Then the status code returned from server is 201
        expect(response.status).toStrictEqual(201);

        //And the new user and organization are created
        expect(response.error).toEqual(false);

        jest.setTimeout(10000);
        //And a confirmation email has been sent
        
       // expect(inbox.result).toEqual('success');
        //(inbox.count).toEqual(1);
    });

});