import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Service } from '../_models/Service';
import { AllRequestService } from '../_services/all-request.service';

@Injectable()

export class AllServicesResolver implements Resolve<Service[]> {
  constructor(private request: AllRequestService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Service[]> {
    return this.request.getAll("service");
  }
}
