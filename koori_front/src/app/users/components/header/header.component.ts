import { Component, EventEmitter, Input, OnInit, Output, ViewChild  } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import {ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/users/_models/user';
import { AuthService } from 'src/app/users/_services/auth.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { SigninComponent } from '../signin/signin.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllRequestService } from '../../_services/all-request.service';
import { Service } from '../../_models/Service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menu = false;
  defaultRoute: string = "";
  isConnect$!: Observable<boolean>
  services!: Service[];
  currentUser$!: Observable<User | null>

  @ViewChild('myModalClose') modalClose: any;
   public demandeForm!: FormGroup;
   selected!: ''
  constructor(private route: Router, 
              private actRoute: ActivatedRoute,
              private authService: AuthService,
              private fb: FormBuilder,
              private allRequest: AllRequestService) {}

  ngOnInit(): void {
    this.currentUser$ = this.authService.userValue

    this.allRequest.getAll('service').subscribe(
      data => {
        this.services = data;
        console.log(this.services)
    }
    )

    this.demandeForm = this.fb.group({
      objet: [null],
      description: [null],
      date: [null]
    })
  }

  logout(){
    this.authService.logout();
  }

  public onSave() {
    if (this.demandeForm.invalid) {
     this.demandeForm.controls['objst'].markAsTouched();
     this.demandeForm.controls['description'].markAsTouched();
    } else {
       this.modalClose.nativeElement.click();
       // Close the dialog window
    }
   }


}