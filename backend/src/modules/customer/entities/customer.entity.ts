import Cnpj from "../value-objects/cnpj";
import Cpf from "../value-objects/cpf";

export class Customer {
  private _document: Cpf | Cnpj;
  constructor(
    readonly code: number,
    readonly name: string,
    document: string,
  ) {
    try {
      this._document = new Cpf(document);
    } catch (error) {
      this._document = new Cnpj(document);
    }
  }

  get document() {
    return this._document;
  }
}
