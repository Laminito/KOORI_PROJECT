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

  saveEvaluation(resources: string, data:{}):Observable<any>{ 
    return this.http.post(this.envApi+ resources,data)
  }

  updateEvaluation(resources: string, data:{}):Observable<any>{ 
    return this.http.put(this.envApi+ resources,data)
  }

  simulateSavingEvaluation(evaluation:any,type:string){
    if(type=='Koori'){
      this.evaluationsKoori.push(evaluation)
  }

  else if(type=='Ibox'){
    this.evaluationsKoori.push(evaluation)
  }
  else if(type=='Fiche'){
    this.evaluationsKoori.push(evaluation)
  }
}


simulateUpdatingEvaluation(evaluation:any,type:string){
  if(type=='Koori'){
    for (let obj of this.evaluationsKoori ) {
      if (obj.UserId === evaluation.UserId && obj.KooriId === evaluation.KooriId) {
          obj.evaluation = evaluation.evaluation;
      }
  }
}
  else if(type=='Ibox'){
    for (let obj of this.evaluationsIbox ) {
      if (obj.UserId === evaluation.UserId && obj.IboxId === evaluation.IboxId) {
          obj.evaluation = evaluation.evaluation;
      }
  }
}
  else if(type=='Fiche'){
    for (let obj of this.evaluationsFiche ) {
      if (obj.UserId === evaluation.UserId && obj.FicheId === evaluation.FicheId) {
          obj.evaluation = evaluation.evaluation;
      }
  }
}
}
}
