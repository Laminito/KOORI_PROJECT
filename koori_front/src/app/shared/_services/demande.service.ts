import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../_models/service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  services!: Service[];

  constructor(private http: HttpClient) { }

  getAllService(): Observable<Service[]>{
    return this.http.get<Service[]>(environment.API+"/service");
  }

  create(body: {}): any{
    return this.http.post(environment.API+'demande/', body)
  }
}
