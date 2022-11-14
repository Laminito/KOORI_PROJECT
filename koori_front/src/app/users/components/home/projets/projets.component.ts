import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Demande } from 'src/app/users/_models/demande';
import { Service } from 'src/app/users/_models/Service';
import { AllRequestService } from 'src/app/users/_services/all-request.service';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {

  services!: Service[];
  demandes: Demande[] = [];
  toggleBtnGroup!: string

  constructor(private allRequest: AllRequestService) { }


  ngOnInit(): void {
    this.allRequest.getAll('service').pipe(
      map(data => {
        this.services = data;
        data.forEach(serve => {
          serve.Demandes.forEach((dmd: Demande) => {
            this.demandes.push(dmd);
            if (dmd.statut === 'traitée') {
              // this.demandes.push(dmd);
            }
          })
        })
      })
    ).subscribe();
  }

}
