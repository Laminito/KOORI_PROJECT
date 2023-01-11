import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { map } from 'rxjs';
import { Demande } from 'src/app/admin/_models/demande';
import { AllRequestService } from 'src/app/admin/_services/all-request.service';
import { SenddataService } from 'src/app/admin/_services/senddata.service';

@Component({
  selector: 'app-detail-service',
  templateUrl: './detail-service.component.html',
  styleUrls: ['./detail-service.component.scss']
})
export class DetailServiceComponent implements OnInit {
  
  public service: any=[]
  id!: number
  demandes!: Demande[]
  idService!: number

  constructor(private route: ActivatedRoute, 
              private sendData: SenddataService,
              private serveService: AllRequestService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.getservicebyId();
    // this.sendDemandeServices();
    // this.sendTitle(serviceLibelle)
    let url = this.router.routerState.snapshot.url.split('/');

    this.idService = Number(url[(url.length - 1)]);

   this.route.data.pipe(
    map(
      data =>  {
        this.demandes = data['listeDemande'].filter((dmd: any)=> dmd.ServiceId == this.service.id)  
        console.log(this.demandes)      
      }
    )
   ).subscribe()
  }
  getservicebyId(){
    this.route.data.subscribe((data: Data) => {
      this.service = data['detailService'];
      this.demandes = data['detailService'].Demande
      console.log(this.demandes)
    });
  }

 

  sendDemandeServices() {
    this.sendData.sendData(this.service)
  }

  sendLibelleService() {
    this.sendData.send(this.service.libelle)
  }
}



