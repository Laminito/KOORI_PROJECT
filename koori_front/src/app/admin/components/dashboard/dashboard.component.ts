import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Router} from "@angular/router";
import { Service } from '../../_models/service';
import { ServiceService } from '../../_services/service.service';
declare var _:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = '';
  services!: Service[];
  p=1
  nbrdemande :[{ valeur: number; cle: string}] = [{valeur: 0, cle: ''}]
  
  tabcolor = ['#344DA8', '#258F49', '#256F49', '#CA8654', '#FF5733', '#5AA99A']

  constructor(private  route: ActivatedRoute,
              private service: ServiceService,
              private _route: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.title = data['title']; 
    });

    this.service.getAllServices().subscribe((data) =>{
      this.services =_.orderBy(data, ['id'], ['asc'])
      
      while(this.nbrdemande.length > 0) {
        this.nbrdemande.pop();
      }
      for(let serve of this.services){
        let c = 0
        if(serve.Demandes.length !== 0){
          // @ts-ignore
          for(let d of serve.Demandes){
            if(d.statut === 'Nouvelle'){
              c +=1;
            }
          }
          this.nbrdemande.push({valeur: c, cle: serve.libelle})
        }
        else {
          this.nbrdemande.push({valeur: 0, cle: serve.libelle})
        }
      }
    })
  }

  navigate(id: number){
    this._route.navigate([`admin/dashboard/service/${id}`])
  }
  
}
