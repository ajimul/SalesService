export interface stockByGroup {
    groupKey: number,
    groupName: string,
    stock:Stock


}

export interface Stock {
	stockId:number,
	stockParticular:string,
	stockHsn:string,
	stockQty:number,
	stockPurchaseAmount:string,//would be without tax
	stockSalesAmount:number,//would be without tax
	stockTaxableValue:number,

}



