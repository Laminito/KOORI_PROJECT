import { Component, Input, OnInit } from '@angular/core';
import 'lodash';
import * as $ from "jquery";
declare var _ :any;
import * as XLSX from 'xlsx';
import { Demande } from '../../_models/demande';
import { ActivatedRoute, Data, Router } from '@angular/router';
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

  
  @Input() demandes!: Demande[]
  idService!: number

  constructor(private route: ActivatedRoute,
          private demandeService:DemandeService,
          private router: Router ){
  }
  
  ngOnInit(): void {

    let url = this.router.routerState.snapshot.url.split('/');

    this.idService = Number(url[(url.length - 1)]);

  //  this.route.data.pipe(
  //   map(
  //     data =>  {
  //       this.demandes = data['listeDemande'].filter((dmd: any)=> dmd.ServiceId == this.idService)        
  //     }
  //   )
  //  ).subscribe()

   

  
  }

 


}