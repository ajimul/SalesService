
export interface Products {//this interface is role as template not related to any entity
    productNo: number,//primaty key of InventoryItems 
    productName: string,
    productModel: string,
    productSerialNo: string,
    productAge: number,
    productValue: number,
    productHsn: string,
    productQty: number,
    productMrp: number,
    productSalesPrice: number,//sales Price 
    productPurchasePrice: number,//sales Price 
    productPer: number,
    productDiscount: number,
    productCgstPercent: number,
    productSgstPercent: number,
    productIgstPercent: number,
    productFinalGst: number,
    productTotalAmount: number,
    productNoOfService: number,
    productMonthOfWarranty: number
  
  }