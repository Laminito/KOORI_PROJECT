import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Route } from '@angular/router';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  mainForm!: FormGroup;

  constructor(private userService: UserService, 
              private formBuilder: FormBuilder) {} 

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
      password: ['', Validators.required],
    });
  }

  onSubmitForm() {
    this.userService.postUser(this.mainForm.value).subscribe(
      (data: any) => console.log(data)
    );
    this.mainForm.reset();
    
  }

}
