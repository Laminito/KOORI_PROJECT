import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    UsersModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RouterModule,
    HttpClientModule
  ]
})
export class CoreModule { }
