import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ibox } from '../_models/ibox';
import { Phase_fiche } from '../_models/phase_fiche';


@Injectable({
  providedIn: 'root'
})
export class IboxService {

  constructor(private http: HttpClient) { }

  getFiches(id: number):Observable<Ibox>{
    return this.http.get<Ibox>(`${environment.API}phase-fiche/${id}`);
  }
  
  getIbox(): any{
    return this.http.get(`${environment.API}ibox`);
  }

  getPhasesFiches():Observable<Phase_fiche[]>{
    return this.http.get<Phase_fiche[]>(`${environment.API}phase-fiche/`);
  }

  getFichesByPhase(id: number):Observable<Phase_fiche>{
    return this.http.get<Phase_fiche>(`${environment.API}phase/fiche/${id}`);
  }

  getLastIbox(){
    return this.http.get<Ibox>(`${environment.API}lastibox/`)
  }
}
