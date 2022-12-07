import {Component, Input, OnInit} from '@angular/core';
import { Rapport } from 'src/app/users/_models/rapport';

@Component({
  selector: 'app-item-rapport',
  templateUrl: './item-rapport.component.html',
  styleUrls: ['./item-rapport.component.css']
})
export class ItemRapportComponent implements OnInit {
  
 @Input() rapportItem!: Rapport

  constructor() { }

  ngOnInit(): void {
     }
}
