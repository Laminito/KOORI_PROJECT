import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Demande } from '../_models/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http: HttpClient) { }

  updateDemande(id: any, body: object): any{
    return this.http.put(`${environment.API}update/demande/${id}`, body)
  }
  updateStatutDemande(id: any, data: object): any{
    return this.http.put(`${environment.API}update/statutdemande/${id}`, data)
  }

  getDemandesByServiceId(id?: number){
    return this.http.get<Demande[]>(`${environment.API}get/service/1/demandes`)
  }

}
