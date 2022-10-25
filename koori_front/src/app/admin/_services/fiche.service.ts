import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FicheService {

  constructor(private http: HttpClient) { }

  postFiche(data: FormData): any{
    // @ts-ignore
    return this.http.post(`${environment.API}add/fiche`, data)
  }
  getFicheById(id: any): any{
    return this.http.get(`${environment.API}get/fiche/${id}`)
  }
  updateFiche(id: any, data: FormData): any{
    return this.http.put(`${environment.API}update/fiche/${id}`, data)
  }
  getEvaluations(id: any): any{
    return this.http.get(`${environment.API}get/evaluation_fiche/fiche/${id}`)
  }
}
