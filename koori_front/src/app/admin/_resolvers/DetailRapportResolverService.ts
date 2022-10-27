import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Rapport} from "../_models/rapport";
import {AllRequestService} from "../_services/all-request.service";

@Injectable({
  providedIn: 'root'
})

export class DetailRapportResolverService implements Resolve<Rapport>{

  constructor(private allRquest: AllRequestService ) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Rapport> | Promise<Rapport> | Rapport {

   return  this.allRquest.getById('rapport/',route.params['id']);

  }
}

