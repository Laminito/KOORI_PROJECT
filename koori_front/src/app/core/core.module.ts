import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
<<<<<<< HEAD
=======
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from '../shared/shared.module';
>>>>>>> e83f12046cab025fe45318f87acd97704f3a3c6d



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
<<<<<<< HEAD
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
=======
    CommonModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RouterModule,
    HttpClientModule
>>>>>>> e83f12046cab025fe45318f87acd97704f3a3c6d
  ]
})
export class CoreModule { }
