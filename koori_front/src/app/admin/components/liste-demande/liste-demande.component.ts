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

  
  demandes!:Demande[]
  constructor(private route: ActivatedRoute,private demandeService:DemandeService ){
    
  }
  
  ngOnInit(): void {
   this.route.data.pipe(
    map(
      data =>  data['listeDemande'].sort((a: Demande, b: Demande) => b.id - a.id)
    )
   ).subscribe(data => {
    this.demandes = data
    console.log(this.demandes)  
   })

  
  }

 


}