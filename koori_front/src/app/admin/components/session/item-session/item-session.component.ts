import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { Demande } from 'src/app/admin/_models/demande';
import { SenddataService } from 'src/app/admin/_services/senddata.service';

@Component({
  selector: 'app-item-session',
  templateUrl: './item-session.component.html',
  styleUrls: ['./item-session.component.scss','../../rapport/item-rapport/item-rapport.component.scss']
})
export class ItemSessionComponent implements OnInit, AfterViewInit {
  @Input() sessionItem: Demande = new Demande();
  @Input() sessions: Demande[] = [];
  constructor(private sendData: SenddataService) {}
  moyennePerFive = 0

  ngOnInit(): void {
    this.moyennePerFive = Math.round((this.sessionItem.moyenne*5/20)*10)/10
  }

  ngAfterViewInit(): void {
    const rate = (document.querySelectorAll('.rating'));
    for (let i=0; i< rate.length; i++){
      for (let j = 9; j >Math.round(9-(this.sessions[i].moyenne/2)); j--) {
        (<HTMLElement> rate[i].childNodes[j]).style.color= "orange"
      }
    }
  }
  sendUsersSession(sendUsersSession:Demande) {
    this.sendData.sendData(sendUsersSession)
  }
}
