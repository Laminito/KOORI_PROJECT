import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IboxService {

  constructor(private http: HttpClient) { }

  getFiches(id: any): any{
    return this.http.get(`${environment.API}get/phase-fiche/${id}`)
  }
  getIbox(): any{
    return this.http.get(`${environment.API}get/ibox`)
  }
  getPhasesFiches(): any{
    return this.http.get(`${environment.API}get/phase-fiche/`)
  }
  getFichesByPhase(id: any): any{
    return this.http.get(`${environment.API}get/phase/fiche/${id}`)
  }
}
