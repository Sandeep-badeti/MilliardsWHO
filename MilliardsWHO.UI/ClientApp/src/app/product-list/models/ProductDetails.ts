import { ProductSKU } from '../models/ProductSKU';
import { ProductVersion } from '../models/ProductVersion';
import { ProductInventory } from './ProductInventory';
import { ProductTag } from './ProductTag';

export class ProductDetails {
    productId: number;
    name: string;
    description: string;
    mainSKU: string;
    upc: string;
    weight: number;
    length: number;
    height: number;
    width: number;
    shipsAlone_FLG: boolean;
    statusId: number;
    weightUnitId: number;
    dimensionUnitId: number;
    colorId: number;
    conditionId: number;
    manufacturerId: number;
    categoryId: number;
    boxId: number;
    ref1: string;
    ref2: string;
    productSku: ProductSKU[];
    productVersion: ProductVersion[];
    productInventory: ProductInventory[];
    productTag: ProductTag[];

}
