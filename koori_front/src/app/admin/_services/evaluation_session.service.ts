import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class evaluationSessionService {

  constructor(private http: HttpClient) { }

  addEvaluation(body:any): any{
    return this.http.post(`${environment.API}add/evaluationSession`, body)
  }


}
