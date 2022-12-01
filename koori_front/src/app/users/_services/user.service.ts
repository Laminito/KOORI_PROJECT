import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getIdUser(id: number){
    return this.http.get(`${environment.API}user/${id}`)
  }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${environment.API}user/`);
  }

  postUser(data: FormData): any{
    // @ts-ignore
    return this.http.post(`${environment.API}user`, data);
  }
}