import { Component, Input, OnInit } from '@angular/core';
import { Demande } from 'src/app/admin/_models/demande';
import { User } from 'src/app/admin/_models/user';
import { UserService } from 'src/app/admin/_services/user.service';
import { DemandeService } from 'src/app/admin/_services/demande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-demande',
  templateUrl: './card-demande.component.html',
  styleUrls: ['./card-demande.component.css']
})
export class CardDemandeComponent implements OnInit {

  @Input() demande!:Demande

  user!:User
  colors:string[] = ['#344DA8','#258F49','#256F49','#CA8654','#FF7713','#FF0000'] 
  statuts:string[]= [  'Nouvelle', 'Traitee', 'Validee','Rejetee','En attente', 'Annulee']

  isClicked!:Boolean;
  isValidated!:Boolean;
  isFinished:string = 'false';
  
  constructor(private userService: UserService,
    private demandeService: DemandeService) { }

  ngOnInit(): void {
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

  changeStatut() {
    this.isClicked = true
    }
    
  saveChangeStatut(event:any){
    let id = event.target.getAttribute('id')
    let input1 = $(`#statut${this.demande.id}`)
    let input2 = $(`#sujet${this.demande.id} textarea`)
    this.isClicked = false
    this.demande.statut = String(input1.val()).charAt(0).toUpperCase() + String(input1.val()).slice(1)
    let obj = {
      statut: String(input1.val()).charAt(0).toUpperCase() + String(input1.val()).slice(1),
      text: String(input2.val()).charAt(0).toUpperCase() + String(input2.val()).slice(1)
    }
    if(obj.statut === 'Validee'){
      this.isValidated = true
    }
    
    this.demandeService.updateStatutDemande(id, obj).subscribe()
    this.sendMailReponseDemande()
  }

  
onClickForFinish(){
  this.isFinished = 'true'

}

onFinishSession(){
  this.isClicked = false
  this.isFinished = 'true true'
  this.demande.statut = 'Traitee'
  let input = $(`#Aurevoir${this.demande.id} textarea`)
  let obj = {
    statut: 'Traitee',
    text: String(input.val()).charAt(0).toUpperCase() + String(input.val()).slice(1)
  }
  let id = this.demande.id
  this.demandeService.updateStatutDemande(id, obj).subscribe()
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
