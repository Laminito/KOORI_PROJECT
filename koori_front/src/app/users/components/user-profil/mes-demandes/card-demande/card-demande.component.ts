import { Component, Input, OnInit } from '@angular/core';
import { Demande } from 'src/app/users/_models/demande';
import { Service } from 'src/app/users/_models/Service';

@Component({
  selector: 'app-card-demande',
  templateUrl: './card-demande.component.html',
  styleUrls: ['./card-demande.component.css']
})
export class CardDemandeComponent implements OnInit {
  @Input() demande!:Demande
  @Input() service!:String
  @Input() color!:String



  constructor() { }

  ngOnInit(): void {

  }

}
