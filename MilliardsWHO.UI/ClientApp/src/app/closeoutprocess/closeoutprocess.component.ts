import { Component, OnInit } from '@angular/core';
import { CloseOutProcessService } from 'src/app/closeoutprocess/services/closeoutprocess.service';
import { WareHouse } from 'src/app/closeoutprocess/Models/WareHouse';
import { FulfillCloseoutList } from './Models/FulfillCloseoutList';
import { FulfillCloseout } from './Models/FulfillCloseOut';
import { FulOrder } from './Models/FulOrder';
import { ViewFullOrder } from 'src/app/closeoutprocess/Models/ViewFullOrder';
import { AppConstants, ModeEnum } from 'src/app/constants/app.constants';
import { Subject } from 'rxjs/internal/Subject';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product-list/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-closeoutprocess',
  templateUrl: './closeoutprocess.component.html'
})
export class CloseOutProcessComponent implements OnInit {
  public wareHouseList: WareHouse[];
  public selectedWarehouseId: number = 0;
  public donePalletizing: boolean;
  public doneExitScan: boolean;
  public closeOutList: FulfillCloseout[];
  public closeOutPalletizing: boolean;
  public closeOutExitScan: boolean;
  private dtTrigger: Subject<any> = new Subject();
  public closeoutForm: FormGroup;
  public message: string = '';
  public showErrorPopup: boolean = false;
  public errorMessage: string;
  public isWarehouseSelected: boolean = false;
  public checkWareHouseSelected: boolean = false;
  public showFullOrder: ViewFullOrder;
  public viewFullOrderPopup: boolean = false;
  public closeOutProcessType: string;
  constructor(
    private router: Router,
    private closeOutprocess: CloseOutProcessService,
    private productService: ProductService,
    private transalteService: TranslateService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.closeOutPalletizing = false;
    this.closeOutExitScan = true;
    this.closeOutList = [];
  }

  ngOnInit(): void {
    this.productService.getProductMetaData().subscribe(resp => {
      this.wareHouseList = resp.warehouseList;
    });
  }
  /**
   * Closeout process data
   * */
  public getCloseOutProcessDetails(closeOutType): void {
    this.closeOutProcessType = closeOutType;
    this.isWarehouseSelected = false;
   this.showErrorPopup = false;
    if (this.selectedWarehouseId !== 0) {
      this.closeOutprocess.getCloseOutProcessDetails(this.selectedWarehouseId, closeOutType).subscribe(resp => {
        this.donePalletizing = resp.donePalletizing;
        this.doneExitScan = resp.doneExitScan;
        this.closeOutList = resp.data;
        this.closeOutPalletizing = resp.donePalletizing;
        this.closeOutExitScan = resp.donePalletizing === false ? true : false;
        switch (closeOutType) {
          case '1':
            this.message = (resp.donePalletizing === false) ? AppConstants.CloseoutErrorMsg : AppConstants.CloseoutPalletizeSuccessMsg;
            if (Object.keys(resp.data).length) {
              this.showMessage(this.message);
            }
            break;
          case '2':
            this.message = (resp.doneExitScan === false) ? AppConstants.CloseoutErrorMsg : AppConstants.CloseoutExitScanSuccessMsg;
            if (Object.keys(resp.data).length) {
            this.showMessage(this.message);
            }
            break;
        }
       // this.showErrorPopup = true;
      });
    } else {
      this.isWarehouseSelected = true;
      this.closeOutList = null;
    }
  }

  /**
* Views fulfilment order
*/
  public viewFulOrder(fulOrder: FulOrder): void {
    this.router.navigate([AppConstants.FulOrderViewUrl], { queryParams: { fullOrderId: btoa((fulOrder.fulOrderId).toString()) } });
  }

  /**
 * Closes popup dialog
 */
  public closeError(): void {
    this.errorMessage = '';
    this.showErrorPopup = false;
  }

  /**
   * Determines whether warehouse change on
   */
  public onWarehouseChange(): void {
    this.isWarehouseSelected = false;
    this.donePalletizing = false;
    this.doneExitScan = false;
    this.closeOutPalletizing = false;
    this.closeOutExitScan = true;
    this.closeOutList = null;
    this.checkWareHouseSelected = true;
  }

  /**
   * View/Edit fulfilment order
   */
  public viewEditFullOrder(data: FulfillCloseout, type: boolean): void {
    this.viewFullOrderPopup = true;
    this.showFullOrder = new ViewFullOrder();
    this.showFullOrder.fullOrderId = data.fulOrderId;
    this.showFullOrder.isEdit = type;
  }

/**
 * close view/edit fulfilment order pop up
 */
  public cancelPopUp(): void {
    this.viewFullOrderPopup = false;
    this.getCloseOutProcessDetails(this.closeOutProcessType);
  }

  /**
* toast message for response
*
*/
  private showMessage(msg: string): void {
    this.snackBar.open(msg, "", {
      duration: 5000,
    });
  }
}
