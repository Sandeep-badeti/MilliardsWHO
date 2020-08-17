import { Box } from "./Box";
import { DimensionUnit } from "./DimensionUnit";
import { WeightUnit } from "./WeightUnit";
import { ProductStatus } from "./ProductStatus";
import { ProductSKUStatus } from "./ProductSKUStatus";
import { WareHouse } from ".//WareHouse";
import { ProductInventoryStatus } from "./ProductInventoryStatus";
import { Manufacturer } from "./Manufacturer";
import { Condition } from "./Condition";
import { Color } from "./Color";
import { ProductTag } from "./ProductTag";
import { ProductCategory } from "./ProductCategory";
import { Tag } from "./Tag";
import { Mode } from "./Mode";
import { Carrier } from "./Carrier";

export class Types {
    boxList: Box[];
    dimensionUnitList: DimensionUnit[];
    weightUnitList: WeightUnit[];
    productStatusList: ProductStatus[];
    productSKUStatusList: ProductSKUStatus[];
    warehouseList: WareHouse[];
    productInventoryStatusList: ProductInventoryStatus[];
    manufacturerList: Manufacturer[];
    conditionList: Condition[];
    colorList: Color[];
    productTagList: ProductTag[];
    productCategoryList: ProductCategory[];
    tagList:Tag[];
    modeList: Mode[];
    carrierList: Carrier[];
}
