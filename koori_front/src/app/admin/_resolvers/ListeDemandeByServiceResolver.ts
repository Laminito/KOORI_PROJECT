import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Demande} from "../_models/demande";
import {SenddataService} from "../_services/senddata.service";

@Injectable({
  providedIn: 'root'
})
export class ListeDemandeByServiceResolver implements Resolve<Demande[]>{
  demandes: Demande[]=[];

  constructor(private receiveData: SenddataService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Demande[]>| Demande[] {
      this.receiveData.receiveData().subscribe((demandes: Demande[])=>{
        this.demandes = demandes.map(demande=>new Demande().deserialize(demande));
      })
    return this.demandes;
  }
}
