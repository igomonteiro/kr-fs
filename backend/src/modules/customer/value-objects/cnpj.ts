const DIGIT_1 = 12;
const DIGIT_2 = 13;

export default class Cnpj {
  value: string;

  constructor(value: string) {
    if (!this.validate(value)) throw new Error("Invalid CNPJ");
    this.value = value;
  }

  private validate(rawCnpj: string) {
    if (!rawCnpj) return false;
    const cnpj = this.clean(rawCnpj);
    if (!this.isValidLength(cnpj)) return false;
    if (this.isBlocked(cnpj)) return false;
    const digit1 = this.calculateDigit(cnpj, DIGIT_1);
    const digit2 = this.calculateDigit(cnpj, DIGIT_2);
    const actualDigit = this.extractActualDigit(cnpj);
    const calculatedDigit = `${digit1}${digit2}`;
    return actualDigit === calculatedDigit;
  }

  private clean(cnpj: string) {
    return cnpj.replace(/[\.\-\/]*/g, "");
  }

  private isValidLength(cnpj: string) {
    return cnpj.length === 14;
  }

  private isBlocked(cnpj: string) {
    const [firstDigit] = cnpj;
    return [...cnpj].every((digit) => digit === firstDigit);
  }

  private calculateDigit(cnpj: string, digit: number) {
    const slice = cnpj.slice(0, digit);
    let factor = digit - 7;
    let sum = 0;

    for (let i = digit; i >= 1; i--) {
      const n = slice[digit - i];
      sum += Number(n) * factor--;
      if (factor < 2) factor = 9;
    }
    const result = 11 - (sum % 11);
    return result > 9 ? 0 : result;
  }

  private extractActualDigit(cnpj: string) {
    return cnpj.slice(12);
  }
}
