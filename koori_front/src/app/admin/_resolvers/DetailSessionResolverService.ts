import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { Session } from '../_models/session';
import { SessionService } from '../_services/session.service';

@Injectable({
  providedIn: 'root'
})
export class DetailSessionResolverService implements Resolve<Session>{

  constructor(private sessionService: SessionService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Session> | Promise<Session> | Session {
    return this.sessionService.getSessionById(+route.params['id'])
  }
}
