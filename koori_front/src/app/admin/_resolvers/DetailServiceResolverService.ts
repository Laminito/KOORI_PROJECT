import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { Service } from '../_models/service';
import { ServiceService } from '../_services/service.service';

@Injectable({
  providedIn: 'root'
})
export class DetailServiceResolverService implements Resolve<Service>{

  constructor(private service: ServiceService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Service> | Promise<Service> | Service {
    return this.service.getServiceById(+route.params['id'])
  }
}
