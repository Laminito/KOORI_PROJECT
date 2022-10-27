import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../_models/Service';

@Injectable({
  providedIn: 'root'
})
export class CatalogueServiceService {


  constructor(private http:HttpClient) { }

  getAllServices(): Observable<Service>{
    return this.http.get<Service>(`${environment.API}get/services`)
  }
  getByLibelleService(libelle: any): Observable<Service>{
    return this.http.get<Service>(`${environment.API}get/service/${libelle}`)
  }
  getByIdService(id: any): Observable<Service>{
    return this.http.get<Service>(`${environment.API}get/service/${id}`)
  }
}
