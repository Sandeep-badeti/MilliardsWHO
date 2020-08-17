import { Component, OnInit, Input,Output, OnChanges, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from 'src/app/constants/app.constants';
import { FullOrderService } from '../view-fulorder/services/full-order.service';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../app/product-list/services/product.service';
import { Types } from '../../app/product-list/models/Types';
import { EditFulOrder } from '../view-fulorder/models/EditFulOrder';
import { ViewFullOrder } from '../view-fulorder/models/ViewFullOrder';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-view-fulorder',
  templateUrl: './view-fulorder.component.html',
  styleUrls: ['./view-fulorder.component.css']
})
export class ViewFulorderComponent implements OnInit, OnChanges {
  @Input() public viewFullOrder: ViewFullOrder;
  @Output() public cancelPop = new EventEmitter();
  fulOrderDetails: any = {}
  public submitted: boolean;
  public types: Types;
  public fulorderForm: FormGroup;
  public message: string = "";
  public errorMessage: string;
  public showErrorPopup: boolean = false;
  public showFulorder: boolean = false;
  public CancelPopup: boolean = false;
  private fulOrderId: number;
  public isErrorReason: boolean = false;
  public isOnHoldReason: boolean = false;
  public isEdit: boolean = false;
  public inValidForm : boolean = false;

  constructor(private fullOrderService: FullOrderService, private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private transalteService: TranslateService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
    this.types = new Types();
    this.fulorderForm = this.formBuilder.group({
      onHoldReason: ['', Validators.nullValidator],
      errorReason: ['', Validators.nullValidator],
      errorFlag: ['',Validators.nullValidator],
      onHoldFlag: ['',Validators.nullValidator]
    });
    transalteService.setDefaultLang(AppConstants.DefaultLang);
  }
  public ngOnChanges() {
    if (this.viewFullOrder) {
      this.fulOrderId = this.viewFullOrder.fullOrderId;
      this.isEdit = this.viewFullOrder.isEdit;
    }
  }
  ngOnInit() : void {
    this.fulOrderDetails = {};
    //this.route.queryParams.subscribe(params => {

    //  this.fulOrderId = parseInt(atob(params.fullOrderId));
    //});
    if (this.fulOrderId > 0) {
      this.getFulOrderVew(this.fulOrderId);
    } else {
      this.router.navigate([AppConstants.FulOrderListUrl]);
    }

    this.productService.getProductMetaData().subscribe((types) => {
      this.types = types;
    });
  }
  /**
   * Closes ful order details
   */
  public closeFulOrderDetails(): void {
    this.cancelPop.emit(false);
    //this.router.navigate([AppConstants.FulOrderListUrl]);
  }

  /**
   * Gets ful order vew
   * @param fulOrderId 
   */
  private getFulOrderVew(fulOrderId: number): void {
    this.fullOrderService.getFulOrderVew(fulOrderId).subscribe((resp) => {
      this.fulOrderDetails = resp;
    });
  }
  /**
 * Closes product dialog
 */
  public closeFulorder(): void {
    this.message = '';
    this.showFulorder = false;
  }
/**
* Closes Cancel PopUp dialog
*/
  public closeCancelPopUp(): void {
    this.CancelPopup = false;
  }
/**
* Showing Cancel PopUp dialog
*/
  public ShowCancelPopup(): void {
    this.CancelPopup = true;
  }


  /**
 * Closes error dialog
 */
  public closeError(): void {
    this.errorMessage = '';
    this.showErrorPopup = false;
  }

  /**
 * update fulOrdes component
 *  
 */
  public update(): void {

    this.submitted = false;
    if (this.inValidForm) {
      return;
    } else {
      let fulfillInfo = new EditFulOrder();
      fulfillInfo.fulOrderId = this.fulOrderDetails.fulOrderId,
        fulfillInfo.errorFlag = this.fulOrderDetails.errorFlag,
        fulfillInfo.onHoldFlag = this.fulOrderDetails.onHoldFlag,
        fulfillInfo.errorReason = this.fulOrderDetails.errorReason,
        fulfillInfo.onHoldReason = this.fulOrderDetails.onHoldReason

      this.fullOrderService.editfulOrder(fulfillInfo).subscribe(data => {
        if (data) {
          if (data["fulOrderID"] > 0 && data["status"] == true) {
            this.message = data.message;
            this.showMessage(this.message);
            this.closeFulOrderDetails();
          } else if (data["status"] == false) {
            console.log(data['message']);
            this.errorMessage = 'Error occurred during edit ful order';
            this.showMessage(this.errorMessage);
          }
        }
      }, (err) => {

        console.log('Error in edit fulorder', err);
      });

    }
  }

  /**
* cancel fulOrder 
*  
*/
  public cancelFulfillment(): void {
    this.fullOrderService.cancelFulfillmentOrder(this.fulOrderDetails.fulOrderId).subscribe(data => {
      this.message = data.message;
      this.showMessage(this.message);
      this.closeFulOrderDetails();      
    }, (err) => {
        console.log('Error while cancel fulfillment order', err);
      });
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

  /**
   * Determines whether submit on
   * @returns  
   */
  public onSubmit(): boolean {
    event.preventDefault();
    this.submitted = true;
    if (this.fulorderForm.invalid) {
      window.scrollTo(0, 0);
      return;
    }
  }
  /**
 * Gets form controls
 */
  public get f() { return this.fulorderForm.controls; }
  /**
* Determines whether change the Reason
* @param value 
*/
  public changeReason(value: any): void {
    var errorReason = this.fulorderForm.get('errorReason').value;
    var onHoldReason = this.fulorderForm.get('onHoldReason').value;
    var errorFlag = this.fulorderForm.get('errorFlag').value;
    var onHoldFlag = this.fulorderForm.get('onHoldFlag').value;

    if (onHoldReason == 0 && onHoldFlag == true)
      this.inValidForm = true;
    else if (errorReason == 0 && errorFlag == true)
      this.inValidForm = true;
    else
      this.inValidForm = false;
  }

}
