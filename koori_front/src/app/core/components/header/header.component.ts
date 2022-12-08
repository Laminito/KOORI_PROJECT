import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {ActivatedRoute, Router } from '@angular/router';
import { SigninComponent } from 'src/app/users/components/signin/signin.component';
import { SignupComponent } from 'src/app/users/components/signup/signup.component';
import { AuthService } from 'src/app/users/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<boolean>();
  isLoggedIn!:boolean
  menu = false;

  defaultRoute: string = "";

  constructor(private route: Router, 
              private actRoute: ActivatedRoute,
              private dialog: MatDialog,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = Boolean(localStorage.getItem('access_user'))
  }

  open(){
      // @ts-ignore
    this.defaultRoute = this.actRoute.snapshot['_routerState'].url
    if (this.defaultRoute === "/kooriibox"){
        this.menu = true;
    }
    $(document.getElementsByClassName('w-75')).hide()
  }

 



}

