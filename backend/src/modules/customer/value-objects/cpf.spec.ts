import Cpf from "./cpf";

test("Deve validar um CPF", () => {
  const cpf = new Cpf("935.411.347-80");
  expect(cpf).toBeTruthy();
});

test("Deve tentar validar um cpf inválido", () => {
  expect(() => new Cpf("123.456.789-99")).toThrow(new Error("Invalid CPF"));
});

test("Deve tentar validar um cpf inválido com todos os dígitos iguais", () => {
  expect(() => new Cpf("111.111.111-11")).toThrow(new Error("Invalid CPF"));
});

test("Deve tentar validar um cpf inválido muito grande", () => {
  expect(() => new Cpf("123.456.789-1000")).toThrow(new Error("Invalid CPF"));
});

test("Deve tentar validar um cpf inválido muito pequeno", () => {
  expect(() => new Cpf("123.456")).toThrow(new Error("Invalid CPF"));
});

test("Deve tentar validar um cpf inválido com letras", () => {
  expect(() => new Cpf("123a456b789c00")).toThrow(new Error("Invalid CPF"));
});
