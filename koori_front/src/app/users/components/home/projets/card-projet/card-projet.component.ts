import { Component, Input, OnInit } from '@angular/core';
import { Demande } from 'src/app/users/_models/demande';
import { Service } from 'src/app/users/_models/Service';

@Component({
  selector: 'app-card-projet',
  templateUrl: './card-projet.component.html',
  styleUrls: ['./card-projet.component.css']
})
export class CardProjetComponent implements OnInit {


  @Input() demandes!: Demande[]

  constructor() {}

  ngOnInit(): void {

  }

  
}
