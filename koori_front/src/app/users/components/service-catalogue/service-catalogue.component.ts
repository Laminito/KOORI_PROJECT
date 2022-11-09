import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../_models/Service';
import { AllRequestService } from '../../_services/all-request.service';


@Component({
  selector: 'app-service-catalogue',
  templateUrl: './service-catalogue.component.html',
  styleUrls: ['./service-catalogue.component.css']
})
export class ServiceCatalogueComponent implements OnInit {

  services: Service[] = [];

  constructor(private allRequest: AllRequestService, private router: Router) {}

  ngOnInit(): void {
    this.getAllService();
  }

  getAllService(){this.allRequest.getAll("service/").subscribe((data)=>{
      this.services = data
  })}

  onGetService(id: number){
    this.router.navigateByUrl('/home/service/'+id);
  }
}
