import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { Demande } from '../../_models/demande';
import { Service } from '../../_models/Service';
import { User } from '../../_models/user';
import { AllRequestService } from '../../_services/all-request.service';
import { DemandeService } from '../../_services/demande.service';
import { UserService } from '../../_services/user.service';


@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  public demande: Demande = new Demande;
  user: User= new User
  demandeForm!: FormGroup;
  services: Service[]=[]
  message: string= "";
  tab: any;
  submitted= false;

  public errorsMessage ={
    titre:[
      {type: 'required', message:'ce champs est obligatoire'}
    ]
  } ;


  constructor(
    private demandService: DemandeService,
    private allRequest: AllRequestService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: Router) { }

  ngOnInit(): void {

       //this.getService();
       this.getUser()
  this.demandeForm = this.formBuilder.group({
    UserId: [3, Validators.required],
    ServiceId: [2, Validators.required],
    titre: ['', Validators.required],
    description: ['', Validators.required],
    date_realisation: ["", Validators.required],
  });
  }

//recuperer tous les service
  getService(){this.allRequest.getAll("services").subscribe((data:any)=>{this.services=data})}
  getUser(){this.userService.getIdUser(2).subscribe((data)=>{this.user= data;})}

  get f(){return this.demandeForm.controls}
  onsubmit(){
    console.log(this.demandeForm.value);

    this.demandService.create(this.demandeForm.value,).subscribe((data: any)=>{
      if(data){
        //this.route.navigate(['/service']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'MERCI BEAUCOUP !',
          text: 'Votre evaluation a été enregistré avec succés',
          showConfirmButton: false,
          timer: 3000
        })
      }
    },
    (error: { error: { errors: { msg: string; }; }; })=>{
      this.message = error.error.errors.msg;
      console.log(this.message);
    })
   }
}
