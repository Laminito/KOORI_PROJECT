import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getIdUser(id:any){
    return this.http.get(`${environment.API}get/user/${id}`)
  }
  postUser(data: FormData): any{
    // @ts-ignore
    return this.http.post(`${environment.API}add/user`, data)
  }
}
