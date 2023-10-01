import { TransectionalAccounts } from "./transactional-account"


export interface PayEmi {
    userId: number,
    accountId: number,
    partyAcName: string,
    transectionDate: string,
    narration: string,
    emi: {
        emiId: number,
        emi_BiId: number,
        emiNo: number,
        emiAmount: number,
        emiStatus: string,
        emiDate: string,
        emiMessage: string,
        emiSmsStatus: boolean

    }
    transectionalAccounts: TransectionalAccounts,

}
