import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import { Session } from 'src/app/admin/_models/session';
import { SenddataService } from 'src/app/users/_services/senddata.service';

@Component({
  selector: 'app-detail-rapport',
  templateUrl: './detail-rapport.component.html',
  styleUrls: ['./detail-rapport.component.scss','../item-rapport/item-rapport.component.scss']
})
export class DetailRapportComponent implements OnInit, AfterViewInit {
title:string=''
  note:number=0
  detailRapport: Session[] = []
  constructor( private route: ActivatedRoute, private getData:SenddataService) { }

  ngAfterViewInit(): void {
    const rate = document.querySelectorAll(".rating");
      for (let i=0; i< rate.length;i++){
        this.note=this.detailRapport[i].User?.UserEvaluation.length>0?
          (this.detailRapport[i].User?.UserEvaluation[0]?.Evaluation_note.note)/2:0
        for (let j = 9; j > (9 - this.note); j--) {
          (<HTMLElement> rate[i].childNodes[j]).style.color= "orange"
        }
      }
}

  ngOnInit(): void {
  // this.getData['currentMessage'].subscribe((mess: string)=>{
  //   this.title=mess;
  //   console.log(mess)
  // })
      this.route.data.subscribe(
     (data: Data) => {
       this.detailRapport = data['detailRapport'].map((session:Session)=> new Session().deserialize(session))
       // @ts-ignore
       console.log(this.detailRapport)
     }
   );
  }

}
