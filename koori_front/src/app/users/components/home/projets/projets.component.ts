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
  toggleBtn!: string

  constructor(private allRequest: AllRequestService) { }


  ngOnInit(): void {
    this.allRequest.getAll('service').pipe(
      map(data => {
        this.services = data.sort((a, b) => a.id - b.id);
        this.services.forEach(serve => {
          serve.Demandes.forEach((dmd: Demande) => {
            this.demandes.push(dmd);
            if (this.toggleBtn == String(dmd.id)) {
              // this.demandes.push(dmd);
            }
          })
        })
      })
    ).subscribe();
  }

}
