import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Demande } from 'src/app/admin/_models/demande';

@Component({
  selector: 'app-detail-session',
  templateUrl: './detail-session.component.html',
  styleUrls: ['./detail-session.component.scss','../../rapport/item-rapport/item-rapport.component.scss']
})
export class DetailSessionComponent implements OnInit, AfterViewInit {


  public session: Demande = new Demande()
  note: number = 0

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getbyId();
  }
  getbyId(){
    this.route.data.subscribe((data: Data) => {
      this.session = data['session'];});
  }

  ngAfterViewInit(): void {
    const rate = document.querySelectorAll(".rating");
    for (let i=0; i< rate.length;i++){
      this.note=this.session.DemandeUser[i].Session.note>0?
        (this.session.DemandeUser[i].Session.note)/2:0
      for (let j = 9; j > (9 - this.note); j--) {
        (<HTMLElement> rate[i].childNodes[j]).style.color= "orange"
      }
    }
  }
}
