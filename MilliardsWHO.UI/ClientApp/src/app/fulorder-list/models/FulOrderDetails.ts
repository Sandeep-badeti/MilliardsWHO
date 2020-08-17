export class FulOrderDetails {
    status: boolean;
    data: {
        trackingNumber: string;
        fulOrderId: number;
        productName: string;
        fulOrderStatus: string;
        sku: string;
        productPic:string;
    }
    message: string;
}
