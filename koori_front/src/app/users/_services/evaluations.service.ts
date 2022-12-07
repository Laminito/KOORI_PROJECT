import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evaluation_fiche } from '../_models/evaluation_fiche';
import { Evaluation_ibox } from '../_models/evaluation_ibox';
import { Evaluation_koori } from '../_models/evaluation_koori';


@Injectable({
  providedIn: 'root'
})
export class EvaluationsService {
   
  evaluationsKoori:Evaluation_koori[] = []
  evaluationsIbox:Evaluation_ibox[] = []
  evaluationsFiche:Evaluation_fiche[] = []

  
  envApi = environment.API

  constructor(private http:HttpClient) { }

  saveEvaluation(resources: string, data: any):Observable<any>{ 
    return this.http.post(this.envApi+ resources,data)
  }

  updateEvaluation(resources: string, data:any):Observable<any>{ 
    return this.http.put(this.envApi+ resources, data)
  }

  getEvaluationByIdUser(resources: string):Observable<any>{
    return this.http.get(this.envApi+ resources)
  }
  
}
