import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../_models/Service';
import { AllRequestService } from '../../_services/all-request.service';


@Component({
  selector: 'app-service-catalogue',
  templateUrl: './service-catalogue.component.html',
  styleUrls: ['./service-catalogue.component.css']
})
export class ServiceCatalogueComponent implements OnInit {

  services: Service[] = [];

  constructor(private allRequest: AllRequestService, 
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAllService();
  }

  getAllService(){
    this.route.data.subscribe(
      (data) => {
        this.services = data["services"];
      }
    )
  }

  onGetService(id: number){
    this.router.navigateByUrl('/home/service/'+id)
  }
}
