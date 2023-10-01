import { AddInventoryJournalDTO } from "./add-inventory"
import { BookDetails } from "./bookdetails"
import { Emi } from "./emi"
import { Product } from "./product"
import { TransectionalAccounts } from "./transactional-account"

export interface Sales {
    userId: number,
    accountId:number,
    partyAcName: string,
    transectionDate: string,
    naration: string,
    transectionalAccounts: TransectionalAccounts,
    bookDetails: BookDetails[],
    inventoryJournal: AddInventoryJournalDTO[]
    product: Product[],
    emi: Emi[]
  }