import { Component, OnInit } from '@angular/core';
import 'lodash';
import * as $ from "jquery";
declare var _ :any;
import * as XLSX from 'xlsx';
import { Demande } from '../../_models/demande';
import { ActivatedRoute, Data } from '@angular/router';
import { AllRequestService } from '../../_services/all-request.service';
import { DemandeService } from '../../_services/demande.service';
import { SenddataService } from '../../_services/senddata.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-liste-demande',
  templateUrl: './liste-demande.component.html',
  styleUrls: ['./liste-demande.component.scss']
})
export class ListeDemandeComponent implements OnInit {

  colors:string[] = ['#344DA8','#258F49','#256F49','#CA8654','#FF7713','#FF0000'] 
  statuts:string[]= [  'Nouvelle', 'Traitee', 'Validee','Rejetee','En attente', 'Annulee']
  input1!:any
  demandes!:Demande[]
  isClicked!:Boolean;
  constructor(private route: ActivatedRoute,private demandeService:DemandeService ){
    
  }
  
  ngOnInit(): void {
   this.route.data.subscribe(data => {this.demandes = data['listeDemande']
   console.log(this.demandes[0])  
      
   })
  }

  onDelete(id:any){
    console.log(id)
  }

  changeStatut(event:any){
    let id = event.target.getAttribute('id')
    if (id) {
      let span = $(`#statut${id} span`)
      let circle = $(`#statut${id} i`)
      $(`#statut${id}`).empty()
      if (span.text() === 'En attente') {
        this.input1 = $("<select class='form-select' style='border-color: var(--vert);\n" +
          "border: solid 1px var(--vert); box-shadow: 0 0 0 0.1rem var(--vert); outline: none;'>" +
          "<option value='validee'>Validee</option>" +
          "<option value='annulee'>Annulee</option>" +
          "<option value='Traitee'>Traitee</option>" +
          "</select>")
      } 
      else if (span.text() === 'Nouvelle') {
          this.input1 = $("<select class='form-select' style='border-color: var(--vert);\n" +
            "border: solid 1px var(--vert); box-shadow: 0 0 0 0.1rem var(--vert); outline: none;'>" +
            "<option value='en attente'>En attente</option>" +
            "<option value='rejetee'>Rejetee</option>")
      }

      let label = $("<label class='text-wrap mt-2 fw-bold'>Sujet</label>")
      let text = $("<textarea class='text-wrap mt-2' style='background: #ECECEC;\n" +
        "box-shadow: 0 0 0 0.1rem var(--vert);\n" +
        "border-radius: 5px;\n" +
        "border: solid 1px var(--vert); width: 100%'></textarea>")
      this.input1.appendTo($(`#statut${id}`));
      label.appendTo($(`#statut${id}`));
      text.appendTo($(`#statut${id}`));
      $(`#${id}`).off('click').removeClass('fa-pencil-alt').addClass(`fa-check fa-check${id}`)
      $(`.fa-check${id}`).removeAttr('id')
      $(`.fa-check${id}`).css("color", "green").parent().addClass(`btn${id}`).off('click')


      $(`.btn${id}`).on('click', () => {
        let obj = {
          statut: this.input1.val(),
          text: text.val(),
        }
        this.demandeService.updateStatutDemande(id, obj).subscribe()
      }
        )
    }
    }
  }

