const FACTOR_DIGIT_1 = 10;
const FACTOR_DIGIT_2 = 11;

export default class Cpf {
  value: string;

  constructor(value: string) {
    if (!this.validate(value)) throw new Error("Invalid CPF");
    this.value = value;
  }

  private validate(rawCpf: string) {
    if (!rawCpf) return false;
    const cpf = this.clean(rawCpf);
    if (!this.isValidLength(cpf)) return false;
    if (this.isBlocked(cpf)) return false;
    const digit1 = this.calculateDigit(cpf, FACTOR_DIGIT_1);
    const digit2 = this.calculateDigit(cpf, FACTOR_DIGIT_2);
    const actualDigit = this.extractActualDigit(cpf);
    const calculatedDigit = `${digit1}${digit2}`;
    return actualDigit === calculatedDigit;
  }

  private clean(cpf: string) {
    return cpf.replace(/[\.\-]*/g, "");
  }

  private isValidLength(cpf: string) {
    return cpf.length === 11;
  }

  private isBlocked(cpf: string) {
    const [firstDigit] = cpf;
    return [...cpf].every((digit) => digit === firstDigit);
  }

  private calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) {
        total += parseInt(digit) * factor--;
      }
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  private extractActualDigit(cpf: string) {
    return cpf.slice(9);
  }
}
