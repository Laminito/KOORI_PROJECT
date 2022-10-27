import { Component, OnInit } from '@angular/core';
import { Service } from '../../_models/Service';
import { AllRequestService } from '../../_services/all-request.service';


@Component({
  selector: 'app-service-catalogue',
  templateUrl: './service-catalogue.component.html',
  styleUrls: ['./service-catalogue.component.css']
})
export class ServiceCatalogueComponent implements OnInit {

  services: Service[] = [];

  constructor(private allRequest: AllRequestService) {}

  ngOnInit(): void {
    this.getAllService();
  }

  getAllService(){this.allRequest.getAll("get/services/").subscribe((data)=>{
      this.services = data
  })}

}
