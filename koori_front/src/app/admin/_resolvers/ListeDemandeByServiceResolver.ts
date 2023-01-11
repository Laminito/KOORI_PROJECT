import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Demande} from "../_models/demande";
import { DemandeService } from '../_services/demande.service';
import { AllRequestService } from '../_services/all-request.service';

@Injectable({
  providedIn: 'root'
})
export class ListeDemandeByServiceResolver implements Resolve<Demande[]>{
  demandes: Demande[]=[];

  constructor(private demandeService: DemandeService,
              private allRequest: AllRequestService, ) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):Observable<Demande[]>{
      return this.allRequest.getAll("demande")
  }
}
