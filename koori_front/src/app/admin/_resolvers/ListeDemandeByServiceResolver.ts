import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Demande} from "../_models/demande";
import { AllRequestService } from '../_services/all-request.service';

@Injectable({
  providedIn: 'root'
})
export class ListeDemandeByServiceResolver implements Resolve<Demande[]>{
  demandes: Demande[]=[];

  constructor(private allRequestService:AllRequestService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Demande[]>{
      return this.allRequestService.getAll('demande')
    
  }
}
