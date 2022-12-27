import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  mainForm!: FormGroup;

  constructor(private auth: AuthService, 
              private formBuilder: FormBuilder,
              private router: Router) {} 

  ngOnInit(): void {
    this.initMainForm();
  }

  initMainForm(): void{
    this.mainForm = this.formBuilder.group({
      ProfilId: 1,
      nomComplet: ['', Validators.required],
      profession: ['', Validators.required],
      service: ['', Validators.required],
      departement: ['', Validators.required],
      direction: ['', Validators.required],
      email: ['', Validators.required],
      avatar: "http://www.marhba.com/images/business/Orange.png",
      password: ['', Validators.required],
    });
  }

  onSubmitForm() {
    // this.auth.signUp(this.mainForm.value).subscribe();
    this.mainForm.reset();
    this.router.navigateByUrl('/home/signin');
  }

}
