import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards/auth-guard.guard';
import { ViewFulorderComponent } from '../view-fulorder/view-fulorder.component'


@NgModule({
  declarations: [
    ViewFulorderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[ViewFulorderComponent]
})
export class ViewFullorderModule { }
