import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {Location} from '@angular/common';
import { User } from '../../_models/user';
import { Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';


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
  @Output() newItemEvent = new EventEmitter<boolean>();

  emailCtrl!: FormControl
  passwordCtrl!: FormControl


  constructor(public fb: FormBuilder, 
              public router: Router, 
              private authService: AuthService,
              private _location: Location,
              ) {}

  ngOnInit(): void {
    this.emailCtrl = this.fb.control('', [Validators.required, Validators.email]);
    this.passwordCtrl = this.fb.control('', [Validators.required, Validators.minLength(4)])

    this.signinForm = this.fb.group({
      email: this.emailCtrl,
      password: this.passwordCtrl
    })
  }

  onSubmitForm(){
    if (this.signinForm.valid) {
      this.authService.login(this.signinForm.value).subscribe()
      
    }

  }

  getFormCtrlErrorText(ctrl: AbstractControl){
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
        return 'Merci d\'entrer une adresse mail valide';
    } else if (ctrl.hasError('minlength')) {
        return 'Password invalide !';
    } else {
        return 'Ce champ contient une erreur';
    }
  }


 
}

