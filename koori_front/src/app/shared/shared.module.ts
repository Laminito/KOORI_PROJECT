import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from './material.module';
import { DemandeComponent } from './components/demande/demande.component';


@NgModule({
  declarations: [
    DemandeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MaterialModule
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CdkStepperModule,
    NgStepperModule,
    NgxPaginationModule,
    MaterialModule,
    DemandeComponent
  ]
})

export class SharedModule { }

