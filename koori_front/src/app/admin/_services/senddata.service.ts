import { Injectable } from '@angular/core';
import { Fiche } from '../_models/fiche';
import {BehaviorSubject, Observable, Subject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SenddataService {
  private dataToSend: any
  private data: Fiche[] = [];
  private id!: number | undefined;
  private subject = new BehaviorSubject<any>(null)

  public messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor() {}

  sendData(data: any){
    this.subject.next(data);
  }
  receiveData():Observable<any>{
    return this.subject.asObservable();
  }
  setData(data:Fiche[]){
    this.data = data;
  }
  getdata(){
    return this.data;
  }

  setId(id: number | undefined){
    this.id = id;
  }
  getId(){
    return this.id;
  }

  send(data:any){
    this.dataToSend = data;
  }
  receive(){
    return this.dataToSend;
  }
}
