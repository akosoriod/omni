


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


test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});