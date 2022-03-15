import { User } from "../src/entities/user";


const userInput = {
  email: "test@example.com",
  name: "Jane Doe",
  address: "3232 AV23",
  password: "Password123",
};

function sum(a:number, b:number) {
    return a + b;
  }
  module.exports = sum;

/*
test('001 - create user', () => {
    const newUser = new User (userInput);
    newUser.create();
    const user = User.getUser(newUser.id)
    expect((user).toBe(userInput);
});*/