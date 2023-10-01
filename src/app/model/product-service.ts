import { SerialNo } from "./goods-serialno";

export interface ProductServices {
    // psId: number,
    // ps_Id: number,
    psEngineerName: string,
    psNo: number,
    psDate: string,
    psStatus: string,
    psMessage: string,
    serviceProductSerialNo:SerialNo[]
  
  }