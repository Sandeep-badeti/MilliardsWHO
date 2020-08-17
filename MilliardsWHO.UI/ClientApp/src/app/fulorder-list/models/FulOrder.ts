export class FulOrder {
  fullOrderId: number;
  orderId: number;
  warehouse: string;
  carrier: string;
  carrierservice: string;
  fulorderstatus: string;
  pickingbatchID: number;
  labelbatchID: number;
  palletID: number;
  nooffulitems: number;
  onhold: boolean;
  onError: boolean;
  onHoldReason: number;
}
