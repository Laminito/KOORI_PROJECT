import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Demande } from 'src/app/users/_models/demande';
import { Service } from 'src/app/users/_models/Service';
import { DemandeService } from 'src/app/users/_services/demande.service';

import Swal from 'sweetalert2';
import { SigninComponent } from '../../signin/signin.component';

const colors: any = {
  red: { primary: '#ad2121', secondary: '#FAE3E3'},
  blue: { primary: '#1e90ff', secondary: '#D1E8FF'},
  yellow: { primary: '#e3bc08', secondary: '#FDF1BA'},
};

@Component({
  selector: 'app-detail-service',
  templateUrl: './detail-service.component.html',
  styleUrls: ['./detail-service.component.css']
})
export class DetailServiceComponent implements OnInit {


  @ViewChild('closebutton') closebutton:any;
  public service: any=[]
  public demande: Demande = new Demande;
  demandeForm!: FormGroup;
  services: Service[]=[]
  message: string= "";
  submitted: boolean = false;
  titre: string="";

  bsModalRef?: BsModalRef;

  constructor(private route: ActivatedRoute,
              private demandService: DemandeService,
              private formBuilder: FormBuilder,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => { 
      this.service = data['service']
    });

    this.demandeForm = this.formBuilder.group({
      UserId: [3, Validators.required],
      ServiceId: this.service.id,
      titre: ['', Validators.required],
      description: ['', Validators.required],
      date_realisation: ["", Validators.required],
    });

  }

// partie ajouter une demande

  get f(){return this.demandeForm.controls}
  
  onsubmit(){
    this.submitted = true;

    this.demandService.create(this.demandeForm.value).subscribe(
      (data:any)=>{
        if(data){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'MERCI BEAUCOUP !',
            text: 'Nous avons bien reçu votre demande.\n' +
             'Nous vous reviendrons dans de meilleurs delais',
            showConfirmButton: false,
            timer: 3000
          })
        }

        this.submitted = false;
        this.demandeForm.reset()
        this.closebutton.nativeElement.click();

    },
    (error: { error: { errors: { msg: string; param: string; }; }; })=>{
      this.message=error.error.errors.msg;
      this.titre= error.error.errors.param

    })
   }

   openModal(){
    this.bsModalRef = this.modalService.show(SigninComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
   }


}

