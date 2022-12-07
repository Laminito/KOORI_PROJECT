import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fiche } from '../_models/fiche';


@Injectable({
  providedIn: 'root'
})
export class FicheService {

  constructor(private http: HttpClient) { }

  getFicheById(id: any): any{
    return this.http.get(`${environment.API}fiche/${id}`);
  }

  getAllFiches():Observable<Fiche[]>{
    return this.http.get<Fiche[]>(`${environment.API}fiche/`);
  }
}
