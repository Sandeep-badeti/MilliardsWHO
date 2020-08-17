import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CloseOutProcessComponent } from '../closeoutprocess/closeoutprocess.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../_guards/auth-guard.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewFullorderModule } from '../view-fulorder/view-fulorder.module';
@NgModule({
  declarations: [
    CloseOutProcessComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ViewFullorderModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: CloseOutProcessComponent, canActivate: [AuthGuard]
      }
    ])
  ]
})
export class CloseOutProcessModule { }
