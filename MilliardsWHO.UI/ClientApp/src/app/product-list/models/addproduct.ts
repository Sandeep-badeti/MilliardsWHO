import { ProductSKU } from "./ProductSKU";
import { ProductVersion } from "./ProductVersion";
import { ProductInventory } from "./ProductInventory";
import { ProductTag } from "./ProductTag";

export class AddProduct {
    productId?: number;
    name: string;
    description: string;
    upc: string;
    boxId: number;
    statusId: number;
    length: number;
    width: number;
    height: number;
    weight: number;
    dimensionUnitId: number;
    weightUnitId: number;
    shipsAlone_FLG: boolean = true;
    manufacturerId: number;
    conditionId: number;
    categoryId: number;
    colorId: number;
    ref1: string;
    ref2: string;
    productSku: ProductSKU[];
    productVersion: ProductVersion[];
    productInventory: ProductInventory[];
    productTag: ProductTag[];
    mainSKU: string;
}
