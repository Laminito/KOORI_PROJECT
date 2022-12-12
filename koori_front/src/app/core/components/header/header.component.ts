import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SigninComponent } from 'src/app/users/components/signin/signin.component';
import { SignupComponent } from 'src/app/users/components/signup/signup.component';
import { AuthService } from 'src/app/users/_services/auth.service';
import { UserService } from 'src/app/users/_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<boolean>();
  
  isLoggedIn!:boolean
  menu = false;

  isConnect$!: Observable<boolean>;

  defaultRoute: string = "";

  constructor(private route: Router, 
              private actRoute: ActivatedRoute,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.isConnect$ = this.authService.isConnected;
    this.isLoggedIn = this.authService.isLoggedIn
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