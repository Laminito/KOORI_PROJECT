import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as bootstrap from "bootstrap";
import * as $ from 'jquery';
import { Demande } from '../../_models/demande';
import { User } from 'src/app/users/_models/user';
import { AuthService } from 'src/app/users/_services/auth.service';
import { Service } from '../../_models/service';
import { DemandeService } from '../../_services/demande.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  public demande!: Demande;
  user!: User | null
  demandeForm!: FormGroup;
  idService!: number
  services!: Service[]
  message: string= "";
  tab: any;
  submitted= false;
  @Input() libelleService!: String
  modalRef!: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered',
  };
  isLoggedIn!: boolean;
  selectedValue = "";
  public errorsMessage ={
    titre:[
      {type: 'required', message:'ce champ est obligatoire'}
    ]
  };

  constructor(
    private demandService: DemandeService,
    private formBuilder: FormBuilder,
    private route: Router,
    private modalService: BsModalService,
    private authService: AuthService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
      // console.log(this.router);
      this.authService.userValue.subscribe(
        (data) => {
          this.isLoggedIn = data === null ? false : true;
          if (this.isLoggedIn) {
            this.user = data
          }
      })
      
      this.idService = +this.router.snapshot.params['id'];

      this.demandeForm = this.formBuilder.group({
        UserId: [this.user?.id, Validators.required],
        ServiceId: [null, Validators.required],
        titre: ['', Validators.required],
        description: ['', Validators.required],
        date_realisation: ["", Validators.required],
      });

      this.demandService.getAllService().subscribe(data => {
        this.services = data
      })

  }

  openModalDemande(template: TemplateRef<any>) {
    if(this.isLoggedIn){
      this.modalRef = this.modalService.show(template,this.config);
    }
    else{ Swal.fire({
          position: 'center',
          icon: 'info',
          title: "<h4>Veuillez d'abord vous connecter please</h4>",
          cancelButtonText:'Quitter',
          confirmButtonText:'Se Connecter',
          confirmButtonColor:'#338F8E',
          showConfirmButton: true,
          showCancelButton: true,
          timer: 10000
        }).then((result) => {
          if (result.isConfirmed) {
            this.route.navigate(['/home/signin'])
          }
        })
    } 
  }

  onsubmit(){

    if (this.demandeForm.valid) {
      console.log(this.demandeForm.value);
      this.route.navigateByUrl("/home/service/"+this.user?.id)
      this.demandService.create(this.demandeForm.value).subscribe((data: any)=>{
        if(data){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'MERCI BEAUCOUP !',
            text: 'Votre demande a été enregistrée avec succés !',
            showConfirmButton: false,
            timer: 3000
          })
        }
        this.demandeForm.reset();
        this.modalRef.hide();
      },
      (error: { error: { errors: { msg: string; }; }; }) => 
      {
        this.message = error.error.errors.msg;
      })
    }
  }

  onCancel(){
    this.demandeForm.reset();
    this.modalRef.hide();
  }

}

