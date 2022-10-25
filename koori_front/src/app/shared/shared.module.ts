import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { NgChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgChartsModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CdkStepperModule,
    NgStepperModule,
    NgChartsModule,
    NgxPaginationModule
  ]
})

export class SharedModule { }

