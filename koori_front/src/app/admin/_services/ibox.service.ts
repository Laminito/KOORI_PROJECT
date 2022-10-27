import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IboxService {

  constructor(private http: HttpClient) { }

  getFiches(id: any): any{
    return this.http.get(`${environment.API}phase-fiche/${id}`)
  }
  getPhasesFiches(): any{
    return this.http.get(`${environment.API}phase-fiche/`)
  }
  getFichesByPhase(id: any): any{
    return this.http.get(`${environment.API}phase/fiche/${id}`)
  }
  updateIbox(id: any, data: object): any{
    return this.http.put(`${environment.API}ibox/${id}`, data)
  }
  getEvaluations(): any{
    return this.http.get(`${environment.API}evaluation_ibox`)
  }
  updatePhase(id: any, data: FormData): any{
    return this.http.put(`${environment.API}phase/${id}`, data)
  }
}
