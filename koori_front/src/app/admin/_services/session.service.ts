import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Demande} from "../_models/demande";


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  getSessionById(id: number): Observable<any>{
    return this.http.get<any>(`${environment.API}session/${id}`)
  }

}
