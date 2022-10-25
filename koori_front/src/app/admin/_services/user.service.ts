import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {User} from "../_models/user";
import {Session} from "../_models/session";
import { Demande } from '../_models/demande';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserByProfil(idprofil?: number){
    return this.http.get<User[]>(`${environment.API}get/user/profil/${idprofil}`)
  }
  getUserById(id?: number){
    return this.http.get<User>(`${environment.API}get/user/${id}`)
  }
  getDemandesByUserId(id?: number){
    return this.http.get<Demande[]>(`${environment.API}get/demandes/user/${id}`)
  }
}
