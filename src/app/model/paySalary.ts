import { TransectionalAccounts } from "./transactional-account";

export interface PaySalary {
    accountId: number,
    userId: number,
    employeeAcName: string,
    transectionDate: string,
    narration: string,
    transectionalAccounts: TransectionalAccounts,

}