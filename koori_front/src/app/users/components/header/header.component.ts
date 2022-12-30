import { Component, EventEmitter, Input, OnInit, Output, ViewChild  } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import {ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/users/_models/user';
import { AuthService } from 'src/app/users/_services/auth.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { SigninComponent } from '../signin/signin.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menu = false;
  defaultRoute: string = "";
  isConnect$!: Observable<boolean>
  currentUser$!: Observable<User | null>

  constructor(private route: Router, 
              private actRoute: ActivatedRoute,
              private authService: AuthService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.currentUser$ = this.authService.userValue
  }

  logout(){
    this.authService.logout();
  }

}