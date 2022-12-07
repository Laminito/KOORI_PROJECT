import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Demande } from '../_models/demande';
import { AllRequestService } from '../_services/all-request.service';

@Injectable({
  providedIn: 'root'
})
export class DemandesResolver implements Resolve<Demande[]> {

  constructor(private request: AllRequestService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Demande[]> {
    return this.request.getAll("demande");
  }
}

