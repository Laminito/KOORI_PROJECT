import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getByIdContact(id: any): any{
    return this.http.get(`${environment.API}get/contact/${id}`)
  }
}
