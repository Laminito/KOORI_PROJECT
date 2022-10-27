import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {tap} from "rxjs/operators";
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AllRequestService {

  envApi = environment.API;



  constructor(private http: HttpClient) {
    // console.log(this.envApi);
   }

  private _refreshNeeded = new Subject<void>();

 get getRefresh(){
  return  this._refreshNeeded;
 }


  getAll(entity: string, filter="*"):Observable<any>{
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('filter', filter);
    let options = {headers:httpHeaders};

    return this.http.get(this.envApi+entity, options)

  }

  postData(entity:string, data:any){
    return this.http.post(this.envApi+entity,data)
      .pipe(
        tap(()=>{
          this._refreshNeeded.next();
        })
      )
  }

  updateData(entity:string, data:any){
    return this.http.put(this.envApi+entity,data)
      .pipe(
        tap(()=>{
          this._refreshNeeded.next();
        })
      )
  }

  getById(entity: string, id:number):Observable<any>{

    return this.http.get(this.envApi+entity+id)

  }


}
