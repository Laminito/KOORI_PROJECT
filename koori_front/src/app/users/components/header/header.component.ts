import { Component, EventEmitter, Input, OnInit, Output, ViewChild  } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import {ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/users/_models/user';
import { AuthService } from 'src/app/users/_services/auth.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menu = false;
  defaultRoute: string = "";
  isConnect$!: Observable<boolean>

  bsModalRef?: BsModalRef;

  currentUser$!: Observable<User | null>

  constructor(private route: Router, 
              private actRoute: ActivatedRoute,
              private authService: AuthService,
              private modalService: BsModalService) {}

  ngOnInit(): void {
    this.currentUser$ = this.authService.userValue
  }


  logout(){
    this.authService.logout();
  }

  openModalWithComponent() {

    this.bsModalRef = this.modalService.show(SigninComponent, {
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}