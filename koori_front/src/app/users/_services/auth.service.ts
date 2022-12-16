import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profil } from '../_models/profil';
import { User } from '../_models/user';
import {Location} from '@angular/common';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser = new BehaviorSubject<User>({})

  private connected = new BehaviorSubject<boolean>(false);

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, 
              public router: Router,
              private _location: Location,
              private userService: UserService) { }

  signUp(data: any):any{
    return this.http.post(`${environment.API}register`, data)
  }

  signIn(user: {email: string, password: string}){
    return this.http.post<any>(`${environment.API}login`, user).subscribe(
      (res) => {
        console.log(res.token)
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('id_user', res.userID);
        this.userService.getUserById(res.userID).subscribe(
          data => {
            this.currentUser.next(data);
          }
        )
        this.connected.next(true)
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

  get userLogged(){
    return this.currentUser.asObservable();
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

  getIdUserConnected(){
    return Number(localStorage.getItem('id_user'))
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
