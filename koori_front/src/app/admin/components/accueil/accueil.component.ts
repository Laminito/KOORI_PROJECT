import { Component, OnInit } from '@angular/core';
import { Service } from '../../_models/service';
import { AllRequestService } from '../../_services/all-request.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  title= 'kooriAdmin'
  services: Service[]=[];

  constructor(private allRequest: AllRequestService) { }

  ngOnInit(): void {
  }

}
