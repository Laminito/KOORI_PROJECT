import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, delay, map, mapTo, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profil } from '../_models/profil';
import { User } from '../_models/user';
import {Location} from '@angular/common';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private userSubject!: BehaviorSubject<User | null>;
  public user!: Observable<User | null>;

  constructor(private http: HttpClient, 
              private router: Router,
              private userService: UserService,
              private _location: Location
              ){
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.asObservable();
  }

  signup(user: User):Observable<boolean>{
    return this.http.post(`${environment.API}register`, user).pipe(
      mapTo(true),
      delay(1000),
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    )
  }

  login(user: {username: string, password: string}):Observable<any> {
    return this.http.post<any>(`${environment.API}login/`, user).pipe(
      map(res => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('access-token', JSON.stringify(res.token));
            this.getCurrentUser(res.userID).subscribe(user => {
              localStorage.setItem('user', JSON.stringify(user));
              this.userSubject.next(user);
              if (this.userSubject.value?.ProfilId == 1) {
                this.router.navigateByUrl('/admin/dashboard')
              } else {
                this._location.back();
              }
              return user;
            })
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('access-token');
    this.userSubject.next(null);
    this.router.navigate(['/home']);
  }

  getCurrentUser(userId: number){
    return this.userService.getUserById(userId);
  }

}

