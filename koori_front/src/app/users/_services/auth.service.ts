import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, throwError } from 'rxjs';
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
              private userService: UserService){
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.asObservable();
  }

  login(user: {username: string, password: string}) {
    return this.http.post<any>(`${environment.API}login/`, user)
        .pipe(map(res => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('access-token', JSON.stringify(res.token));
            this.getCurrentUser(res.userID).subscribe(user => {
              localStorage.setItem('user', JSON.stringify(user));
              this.userSubject.next(user);
              this.router.navigate(['/home']);
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
