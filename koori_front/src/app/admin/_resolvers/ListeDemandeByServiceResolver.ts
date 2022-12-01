import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Demande} from "../_models/demande";
import { DemandeService } from '../_services/demande.service';

@Injectable({
  providedIn: 'root'
})
export class ListeDemandeByServiceResolver implements Resolve<Demande[]>{

  constructor(private demandeService: DemandeService ) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Demande[]>{
      return this.demandeService.getDemandesByServiceId()
    
  }
}
