import { Customer } from "./customer.entity";

test("Deve criar um cliente com CPF válido", () => {
  const cpf = "196.546.960-45";
  const customer = new Customer(123, "Customer 1", cpf);
  expect(customer.name).toBe("Customer 1");
});

test("Deve criar um cliente com CNPJ válido", () => {
  const cnpj = "03.032.724/0001-05";
  const customer = new Customer(123, "Customer 1", cnpj);
  expect(customer.name).toBe("Customer 1");
});
