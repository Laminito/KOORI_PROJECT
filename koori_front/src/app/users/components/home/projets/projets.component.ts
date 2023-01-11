import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { data } from 'jquery';
import { filter, map, Observable } from 'rxjs';
import { Demande } from 'src/app/users/_models/demande';
import { Service } from 'src/app/users/_models/Service';
import { AllRequestService } from 'src/app/users/_services/all-request.service';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {

  services!: Service[];
  demandes$!: Observable<any>
  demandes: Demande[] = []
  toggleBtn!: string;

  constructor(private allRequest: AllRequestService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.data.subscribe(
      (data) => {
        this.services = data["services"]
      }
    )

    this.allRequest.getAll('demande').subscribe(
      (data) => {
        this.demandes = data
      }
    )
    
    // this.demandes$ = this.allRequest.getAll('demande').pipe(
    //   filter((data: any) => data.statut == 'Traitee')
    //   // (data) => data
    // )

  }

  getAllDemandes(nb: number){
    this.route.data.subscribe(
      (data) => {
        this.demandes = data["demande"].filter((dmd: any) => dmd.ServiceId == nb);
        console.log(this.demandes)
      }
    )
  }

  // checkDemandesType(idService: any){
  //     if(this.toggleBtn == 'all'){
  //       this.getAllDemandes()
  //     }else{
  //       this.demandes = this.demandes.filter(dmd => dmd.ServiceId == idService)
  //     }
  // }

}

