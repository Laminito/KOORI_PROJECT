import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { Fiche } from '../_models/fiche';
// @ts-ignore
import { FicheService } from '../_services/fiche.service';

@Injectable({
  providedIn: 'root'
})
export class FicheResolverService implements Resolve<Fiche>{

  constructor(private ficheService: FicheService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Fiche> | Promise<Fiche> | Fiche {
    return this.ficheService.getFicheById(+route.params['id']);
  } 
  
}
