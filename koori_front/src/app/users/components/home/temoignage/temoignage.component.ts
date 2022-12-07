import { Component, OnInit } from '@angular/core';
import { Temoignage } from 'src/app/users/_models/Temoignage';
import { AllRequestService } from 'src/app/users/_services/all-request.service';

@Component({
  selector: 'app-temoignage',
  templateUrl: './temoignage.component.html',
  styleUrls: ['./temoignage.component.css']
})
export class TemoignageComponent implements OnInit {
  temoignages!: Temoignage[]

  constructor(private allRequest: AllRequestService) { }

  ngOnInit(): void {
    this.getTemoignages();
  }

  getTemoignages() {
    this.allRequest.getAll("temoignage").subscribe((data: any) => {
      this.temoignages = data.map((temoignage: Temoignage) => new Temoignage().deserialize(temoignage));
    })
    
  }
}
