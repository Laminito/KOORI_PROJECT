import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { Service } from '../_models/Service';
import { AllRequestService } from '../_services/all-request.service';
import { CatalogueServiceService } from '../_services/catalogue-service.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceResolverService implements Resolve<Service>{

  constructor(private catService: CatalogueServiceService, private AllRequest: AllRequestService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Service> | Promise<Service> | Service {
    return this.catService.getByIdService(+route.params['id']);

  }
}
