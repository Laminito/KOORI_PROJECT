import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AllRequestService} from "../_services/all-request.service";
import {Demande} from "../_models/demande";

@Injectable({
  providedIn: 'root'
})
export class SessionByServiceResolverService implements Resolve<Demande[]>{

  constructor(private allREquest: AllRequestService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Demande[]> | Promise<Demande[]> | Demande[] {
    return this.allREquest.getAll(`service/${+route.params['id']}/sessions`)
  }
}
