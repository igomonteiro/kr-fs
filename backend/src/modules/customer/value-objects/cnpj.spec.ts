import Cnpj from "./cnpj";

test("Deve validar um CNPJ", () => {
  const cnpj = new Cnpj("82.633.372/0001-10");
  expect(cnpj).toBeTruthy();
});

test("Deve tentar validar um cnpj inválido", () => {
  expect(() => new Cnpj("82.633.372/0001-99")).toThrow(
    new Error("Invalid CNPJ"),
  );
});

test("Deve tentar validar um cnpj inválido com todos os dígitos iguais", () => {
  expect(() => new Cnpj("11.111.111/1111-11")).toThrow(
    new Error("Invalid CNPJ"),
  );
});

test("Deve tentar validar um cnpj inválido muito grande", () => {
  expect(() => new Cnpj("82.633.372/0001-101")).toThrow(
    new Error("Invalid CNPJ"),
  );
});

test("Deve tentar validar um cnpj inválido muito pequeno", () => {
  expect(() => new Cnpj("82.633")).toThrow(new Error("Invalid CNPJ"));
});

test("Deve tentar validar um cnpj inválido com letras", () => {
  expect(() => new Cnpj("123a456b789c00")).toThrow(new Error("Invalid CNPJ"));
});
