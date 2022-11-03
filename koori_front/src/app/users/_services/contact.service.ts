import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../_models/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getByIdContact(id: number): Observable<Contact>{
    return this.http.get<Contact>(`${environment.API}contact/${id}`)
  }

}
