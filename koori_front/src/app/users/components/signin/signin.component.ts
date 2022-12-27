import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {Location} from '@angular/common';
import { User } from '../../_models/user';
import { Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
              private _location: Location,
              public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmitForm(){
    if (this.signinForm.valid) {
      this.authService.login(this.signinForm.value).subscribe();
    }
  }
    
 
}

