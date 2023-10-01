export interface TaxableValue {
    taxableProductName: string,
    cgstTax: number,
    cgstAmount: number,
    sgstTax: number,
    sgstAmount: number,
    igstTax: number,
    igstAmount: number,
    total: number
  }