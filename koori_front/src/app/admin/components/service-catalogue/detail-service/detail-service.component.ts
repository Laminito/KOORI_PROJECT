import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { SenddataService } from 'src/app/admin/_services/senddata.service';

@Component({
  selector: 'app-detail-service',
  templateUrl: './detail-service.component.html',
  styleUrls: ['./detail-service.component.scss']
})
export class DetailServiceComponent implements OnInit {
  public service: any=[]

  constructor(private route: ActivatedRoute, private sendData: SenddataService) { }

  ngOnInit(): void {
    this.getservicebyId();
    // this.sendDemandeServices();
    // this.sendTitle(serviceLibelle)
  }

  getservicebyId(){
    this.route.data.subscribe((data: Data) => {
      this.service = data['detailService'];});
  }


  sendDemandeServices() {
    this.sendData.sendData(this.service)

  }

  sendLibelleService() {
    this.sendData.send(this.service.libelle)
  }
}



