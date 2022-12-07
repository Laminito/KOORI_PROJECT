import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  toggleBtn!: string;

  constructor(private allRequest: AllRequestService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.data.subscribe(
      (data) => {
        this.services = data["services"]
      }
    )
    
    this.route.data.subscribe(
      (data) => {
        this.demandes = data["projets"];
      }
    )

  }

}

