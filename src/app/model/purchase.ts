import { AddInventoryJournalDTO } from "./add-inventory";
import { BookDetails } from "./bookdetails";
import { TransectionalAccounts } from "./transactional-account";

export interface Purchase {
    userId: number,
    accountId:number,
    partyAcName: string,
    invoiceNo: string,
    invoiceDate: string,
    transectionDate: string,
    naration: string,
    transectionalAccounts: TransectionalAccounts,
    bookDetails: BookDetails[],
    inventoryJournal: AddInventoryJournalDTO[]
  }