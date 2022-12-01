import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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

  constructor(public fb: FormBuilder, public router: Router, private authService: AuthService,
    private modalService: BsModalService
   ) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    })
  }

  
  onSubmitForm(){
    //this.authService.signIn(this.signinForm.value);
    if (!this.signinForm.valid){
    this.isValid = false
    this.error="Identifiants incorrectes, voulez vous verifier s'il vous plait"
    
    }
    console.log(this.signinForm.value);
    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered'
      });
 }
    

}

