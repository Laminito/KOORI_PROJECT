import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import jwt_decode from "jwt-decode";

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmitForm(){
    this.authService.signIn(this.signinForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('acces_token', res.token);
        let decoded = jwt_decode(res.token, { header: true });
        console.log(decoded)
      }
    ) 
    this.signinForm.reset();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered'
      });
 }
    

}

