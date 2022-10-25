import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Router} from "@angular/router";
import { Service } from '../../_models/service';
import { AllRequestService } from '../../_services/all-request.service';
declare var _:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = '';
  services: Service[]=[];
  p=1
  nbrdemande :[{ valeur: number; cle?: string}] =[{valeur: 0, cle: ''}]
  
  tabcolor = ['#344DA8', '#258F49', '#256F49', '#CA8654', '#FF5733', '#5AA99A']

  constructor(private  route: ActivatedRoute,
              private allRequest: AllRequestService,
              private _route: Router) {
    this.route.data.subscribe((data: Data) => {
        this.title = data['title'];
      });
    this.allRequest.getAll('get/services/').subscribe((data: any) =>{
      this.services =_.orderBy(data, ['id'], ['asc'])
      while(this.nbrdemande.length > 0) {
        this.nbrdemande.pop();
      }
      for(let s of this.services){
        let c = 0
        if(s.Demandes?.length !== 0){
          // @ts-ignore
          for(let d of s.Demandes){
            if(d.statut === 'Nouvelle'){
              c +=1;
            }
          }
          this.nbrdemande.push({valeur: c, cle: s.libelle})
        }
        else {
          this.nbrdemande.push({valeur: 0, cle: s.libelle})
        }
      }
    })
  }

  ngOnInit(): void {
  }

  navigate(id?:number){
    this._route.navigate([`/dashboard/service/${id}`])
  }
}
