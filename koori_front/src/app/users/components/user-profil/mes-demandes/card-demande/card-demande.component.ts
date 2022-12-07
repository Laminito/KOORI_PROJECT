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
  colors:string[] = ['#344DA8','#258F49','#256F49','#CA8654','#FF7713','#FF0000'] 
  statuts:string[]= [  'Nouvelle', 'Traitee', 'Validee','Rejetee','En attente', 'Annulee']



  constructor() { }

  ngOnInit(): void {
    
    
  }

  downloadExcelFile(){
    
  }
}
