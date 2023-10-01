export interface UpdateInventoryDTO {
    igId: number
    igName: string,
    inventoryLocations: [
        {   
            ilId:number,
            ilName: string,
            il_igId:number,//need for update
            inventoryItems: UpdateInventoryItemsDTO[]
          
        }
    ]

}
export interface UpdateInventoryItemsDTO {
    iiId: number,
    ii_ilId: number,//need for update
    iiParticular: string,
    iiHsn: string,
    iiModelNo: string,
    iiUnitName: string,
    iiQty: number,
    iiMrp: number,
    iiPurchaseAmount: number,
    iiSalesAmount: number,
    iiTDPercent: number,
    iiCgstPercent: number,
    iiSgstPercent: number,
    iiIgstPercent: number,
    iiNoOfService: number,
    iiMonthOfWarranty: number
}