import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FicheService {

  constructor(private http: HttpClient) { }

  getFicheById(id: any): any{
    return this.http.get(`${environment.API}get/fiche/${id}`)
  }
}
