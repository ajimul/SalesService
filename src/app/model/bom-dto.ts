import { AddInventoryJournalDTO } from "./add-inventory"
import { BookDetails } from "./bookdetails"
import { TransectionalAccounts } from "./transactional-account"

export interface Bom_Dto{
    userId: number,
    accountId:number,
    partyAcName: string,
    transectionDate: string,
    naration: string,
    transectionalAccounts: TransectionalAccounts,
    bookDetails: BookDetails[],
    inventoryJournal: AddInventoryJournalDTO[],
    bom: Bom,


  }

  export interface Bom{
    bomItemsId_Ref: number,
    qty: number,
    status: string,
    bomList:Bomlist,
    extraCost:ExtraCost

  }
  export interface Bomlist{
    bomListBomId_Ref:number
    bomListItemsId_Ref:number

  }
  export interface ExtraCost{
      etraCostBomId_Ref:number,
	  costParticular:string,
	  sgst:number,
	  cgst:number,
	  igst:number,
	  sgstAmount:number,
	  cgstAmount:number,
	  igstAmount:number,
	  costParticularAmount:number
  }
