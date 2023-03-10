import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,  Data} from "@angular/router";
import { Demande } from '../../_models/demande';
import { AllRequestService } from '../../_services/all-request.service';
import { SenddataService } from '../../_services/senddata.service';


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  sessions: Demande[]=[];
  userRated:number=0
  serviceLibelle: string = ''

  constructor(private route: ActivatedRoute, private _refreshNeeded: AllRequestService, private getData: SenddataService ) { }
  ngOnInit(): void {
  // this.serviceLibelle=this.getData.receive()
    this._refreshNeeded.getRefresh.subscribe(()=>{
      this.sessions=[]
      this._refreshNeeded.getAll(`service/${+this.route.snapshot.params['id']}/sessions`).subscribe(data=>{
         this.sessions= data.map((session:Demande)=> new Demande().deserialize(session))
        console.log(this.sessions)
       })
    })
    this.getSessionsService()
  }

  private getSessionsService(){
    this.route.data.subscribe(
      (data: Data) => {
        this.sessions = data['sessionService'].map((session:Demande)=> new Demande().deserialize(session))
        this.sessions.forEach(s=>{
          this.userRated=0
          s.DemandeUser.forEach((d:any)=>{
            if (d.Session.note!= null){
              s.moyenne += d.Session.note
              this.userRated++
            }
          })
          if (this.userRated>0){
            s.moyenne = Math.round((s.moyenne /this.userRated)*10) / 10
          }
        })
        console.log(this.sessions)
      }
    );
  }

}
