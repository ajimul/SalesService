import { BookDetails } from "./bookdetails";
import { Emi } from "./emi";
import { Product } from "./product";
import { TransectionalAccounts } from "./transactional-account";

export interface AmcServiceEmi {
    userId: number,
    accountId: number;
    partyAcName: string,
    transectionDate: string,
    naration: string,
    transectionalAccounts: TransectionalAccounts,
    bookDetails: BookDetails[],
    product: Product[],
    emi: Emi[]
  }