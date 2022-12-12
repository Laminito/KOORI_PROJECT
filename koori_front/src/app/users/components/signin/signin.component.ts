import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import jwt_decode from "jwt-decode";
import {Location} from '@angular/common';
import { User } from '../../_models/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;
  modalRef!: BsModalRef;
  error!:string;
  isValid!:Boolean;
  currentUser!: User


  constructor(public fb: FormBuilder, 
              public router: Router, 
              private authService: AuthService,
              private _location: Location) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmitForm(){
    if (this.signinForm.valid) {
      this.authService.signIn(this.signinForm.value)
    }

  }

 redirectToAuthentication(){

 }
    
 
}

