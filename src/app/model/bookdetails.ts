import { SerialNo } from "./goods-serialno";

export interface BookDetails {
    bookDetailsId: number,
    bookDetailsBookInfo_Ref: number,
    bookDetailsInventoryItems_Ref: number,

    iiParticular: string,
    iiHsn: string,
    iiNoOfService:number,
    iiMonthOfWarranty:number,

    bookDetailsParticularAmount: number,
    bookDetailsUnit: string,
    bookDetailsUnitValue: number,
    bookDetailsMolelNo: string,
    bookDetailsTradDiscount: number,
    bookDetailsTradDiscountAmount: number,

    bookDetailsCgst: number,
    bookDetailsSgst: number,
    bookDetailsIgst: number,

    bookDetailsCgstAmount: number,
    bookDetailsSgstAmount: number,
    bookDetailsIgstAmount: number,
    bookItemsSerialNo:SerialNo[]
    }