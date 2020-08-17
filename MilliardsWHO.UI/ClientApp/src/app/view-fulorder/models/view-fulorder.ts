import { FullItem } from "./FullItem";

export class ViewFulOrder {
  fulOrderId: number;
  orderId: number;
  fulOrderStatus: string;
  cancelReason: string
  assignedWareHouse: string;
  assignedCarrier: string;
  carrierUpdateDate: Date;
  box: string;
  assignedCarrierService: string;
  pickingBatchId: number;
  labelBatchId: number
  palletName: string;
  originalFulOrderId: number
  onHoldFlag: boolean;
  onHoldReason: number;
  errorFlag: boolean;
  errorReason: number;
  isPrime: string;
  carrierDescription: string;
  shipByDate: Date;
  assignmentDate: Date;
  fullItemDetails:FullItem[];
}
