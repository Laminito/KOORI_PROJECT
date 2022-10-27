import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Koori} from "../_models/koori";


@Injectable({
  providedIn: 'root'
})
export class KooriService {

  constructor(private http: HttpClient) { }

  getKooriByVersion(idversion: number){
    return this.http.get<Koori>(`${environment.API}koori/version/${idversion}`)
  }
  getVersions(): any{
    return this.http.get(`${environment.API}version`)
  }
  updateKoori(id: any, data: object): any{
    return this.http.put(`${environment.API}koori/${id}`, data)
  }
  getEvaluations(id: any): any{
    return this.http.get(`${environment.API}evaluation_koori/version/${id}`)
  }
}
