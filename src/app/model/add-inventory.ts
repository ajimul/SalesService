export interface AddInventoryDTO {
    igName: string,
    inventoryLocations: [
        {   
            ilName: string,
            inventoryItems: AddInventoryItemsDTO[]
                  }
    ]

}


export interface AddInventoryItemsDTO {
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

export interface AddInventoryJournalDTO {
    ijDate: string,
    ijPartyName: string,
    ijVoucherType: string,
    ijVoucherNo: number,
    ijInwardQty: number,
    ijJInwardAmount: number,
    ijJOutwardQty: number,
    ijJOutwardAmount: number,
}
export interface AddInventoryGroupDTO {
    igName: string
}
