import { ProductServices } from "./product-service";

export interface Product {
    // psId: number,
    ps_AccountId: number,
    ps_AuthorId: number,
    psProductName: string,
    psProductModel: string,
    psProductSerialNo: string,
    psProductAge: number,
    psProductValue: number,
    psType: string,
    psMonthOfWarranty: number,
    psTotalService: number,
    // psTotalAmount: number,
    productServices: ProductServices[],
  
  }