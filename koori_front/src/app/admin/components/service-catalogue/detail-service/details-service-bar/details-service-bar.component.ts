import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/admin/_models/service';
import { AllRequestService } from 'src/app/admin/_services/all-request.service';

@Component({
  selector: 'app-details-service-bar',
  templateUrl: './details-service-bar.component.html',
  styleUrls: ['./details-service-bar.component.css']
})
export class DetailsServiceBarComponent implements OnInit {
[x: string]: any;

  allServices!: Service[]
  @Input() service!: Service
  
  constructor(private allRequestService: AllRequestService,
              private router: Router) { }

  ngOnInit(): void {
    this.allRequestService.getAll('service').subscribe( data => {
      console.log(data)
        this.allServices = data
     })
  }

  onSwitchService(idService: number){
    this.router.navigateByUrl('admin/service/'+idService)
  }

}
