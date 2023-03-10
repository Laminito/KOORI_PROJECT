import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Koori } from '../_models/koori';

@Injectable({
  providedIn: 'root'
})
export class KooriService {

  constructor(private http: HttpClient) { }

  // getLastKoori(){
  //   return this.http.get<Koori>(`${environment.API}koori/last/`)
  // }

}

