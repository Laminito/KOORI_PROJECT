import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';
import { Demande } from '../_models/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  envApi = environment.API;

  constructor(private http: HttpClient) { }

  create(body: {}): any{
    return this.http.post(this.envApi+'add/demande/', body)
  }





//   getByIdUser( id: any){
//     return this.http.get(this.envApi+'get/user/'+`${id}`)
//   }
 }
