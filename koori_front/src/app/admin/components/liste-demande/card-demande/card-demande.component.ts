import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Demande } from 'src/app/admin/_models/demande';
import { User } from 'src/app/admin/_models/user';
import { UserService } from 'src/app/admin/_services/user.service';
import { DemandeService } from 'src/app/admin/_services/demande.service';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-demande',
  templateUrl: './card-demande.component.html',
  styleUrls: ['./card-demande.component.css']
})
export class CardDemandeComponent implements OnInit {

  @Input() demande!:Demande

  user!:User
  colors: string[] = ['#344DA8','#258F49','#256F49','#CA8654','#FF7713','#FF0000'] 
  statuts: string[]= ['Nouvelle', 'Traitee', 'Validee','Rejetee','En attente', 'Annulee']

  isClicked!:Boolean;
  isValidated!:Boolean;
  isFinished:string = 'false';
  demandeForm!: FormGroup

  etatsDemande: String[] = []
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-dialog-centered',
  };
  modalRef?: BsModalRef;
  
  constructor(private userService: UserService,
              private demandeService: DemandeService,
              private modalService: BsModalService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.etatsDemande = ["Nouvelle", "Rejetée", "Validée", "Annulée", "Traitée"]
    this.userService.getUserById(this.demande.UserId).subscribe(
      data => this.user = data
    )
    this.isClicked = false
    this.isValidated = false
    if(this.demande.statut === 'Validee'){
      this.isValidated = true
    }
    if(this.demande.statut === 'Traitee'){
      this.isFinished = 'true true'
    }

  }

  onUpdateDemandeState(demande: Demande){
    this.demandeForm = this.formBuilder.group({
        statut: [demande.statut, Validators.required],
        titre: ['', Validators.required],
    })
  }

  showModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config);
  }

  onCancel(){
    this.modalRef?.hide()
  }

  onSubmit(demande: Demande){
    this.demandeService.updateStatutDemande(demande.id, this.demandeForm.value).subscribe(dmd => {
        demande = dmd
    });
    window.location.reload();
    this.modalRef?.hide();
    this.sendMailReponseDemande()
  }
  // this.sendMailReponseDemande()

  changeStatut() {
    this.isClicked = true
  }
  
  sendMailReponseDemande(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'MERCI BEAUCOUP !',
      text: 'Vous avez tres reponse a la demande a ete bien envoyee',
      showConfirmButton: false,
      timer: 3000
    })
  }


}
