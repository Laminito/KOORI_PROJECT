import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profil } from '../_models/profil';
import { User } from '../_models/user';
import { UserService } from './user.service';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser!: User
  private connected = new BehaviorSubject<boolean>(false);
  error!: string;

  constructor(private http: HttpClient, 
              public router: Router,
              private _location: Location) { }

  signUp(data: any):any{
    return this.http.post(`${environment.API}register`, data)
  }

  signIn(user: {email: string, password: string}){
    return this.http.post<any>(`${environment.API}login`, user).subscribe(
      (res) => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('id_user', res.userID);
        if (localStorage.getItem('access_token') !== null) {
            this.connected.next(true);
        }
        this._location.back();
      }
    )
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isConnected() {
    return this.connected.asObservable();
  }
  
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['home']);
    }
  }

  getUserProfil(id: any):Observable<Profil>{
    return this.http.get<Profil>(`${environment.API}profil/${id}`)
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error('test'));
  }



}

