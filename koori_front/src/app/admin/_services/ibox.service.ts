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
  getPhasesFiches(): any{
    return this.http.get(`${environment.API}get/phase-fiche/`)
  }
  getFichesByPhase(id: any): any{
    return this.http.get(`${environment.API}get/phase/fiche/${id}`)
  }
  updateIbox(id: any, data: object): any{
    return this.http.put(`${environment.API}update/ibox/${id}`, data)
  }
  getEvaluations(): any{
    return this.http.get(`${environment.API}get/evaluation_ibox`)
  }
  updatePhase(id: any, data: FormData): any{
    return this.http.put(`${environment.API}update/phase/${id}`, data)
  }
}
