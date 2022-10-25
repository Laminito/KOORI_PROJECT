import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../_models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private headerFormData = new HttpHeaders({Accept: '*/*'});

  constructor(private http: HttpClient) { }
  addService(body: FormData): any{
    return this.http.post(`${environment.API}add/service/`,
     body, { headers : this.headerFormData} );
  }
  getServiceById(id: any): Observable<Service>{
    return this.http.get<Service>(`${environment.API}get/service/${id}`)
  }
  updateService(id: any, body:string){
    return this.http.put<Service>(`${environment.API}update/service/${id}`,
     body, { headers : this.headerFormData} );
  }
}
