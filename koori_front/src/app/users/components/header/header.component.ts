import { Component, EventEmitter, Input, OnInit, Output, ViewChild  } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import {ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/users/_models/user';
import { AuthService } from 'src/app/users/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 
  menu = false;
  defaultRoute: string = "";
  isConnect$!: Observable<boolean>
  currentUser$!: Observable<User>

  constructor(private route: Router, 
              private actRoute: ActivatedRoute,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.isConnect$ = this.authService.isConnected
    this.currentUser$ = this.authService.userLogged
  }

  open(){
      // @ts-ignore
    this.defaultRoute = this.actRoute.snapshot['_routerState'].url
    if (this.defaultRoute === "/kooriibox"){
        this.menu = true;
    }
    $(document.getElementsByClassName('w-75')).hide()
  }

  logout(){
    this.authService.doLogout();
  }
  
}