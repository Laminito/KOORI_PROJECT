import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { map } from 'rxjs';
import { Demande } from 'src/app/admin/_models/demande';
import { Service } from 'src/app/admin/_models/service';
import { SenddataService } from 'src/app/admin/_services/senddata.service';

@Component({
  selector: 'app-detail-service',
  templateUrl: './detail-service.component.html',
  styleUrls: ['./detail-service.component.scss']
})
export class DetailServiceComponent implements OnInit {
  
  id!: number
  idService!: number

  service!: Service
  demandes!: Demande[]

  images: string[] = [
    "https://static.vecteezy.com/system/resources/previews/007/983/691/non_2x/quick-tips-label-design-free-vector.jpg",
    "https://img.freepik.com/free-vector/people-starting-business-project_23-2148866842.jpg?w=2000",
    "https://localist-images.azureedge.net/photos/40808593573296/card/f2cd6ca2271ec2af793407accfc7ac7ec2ebd0d5.jpg",
    
  ]

  constructor(private route: ActivatedRoute, 
              private sendData: SenddataService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    let url = this.router.routerState.snapshot.url.split('/');
    this.idService = Number(url[(url.length - 1)]);

   this.route.data.subscribe((data: Data) => {
      this.service = data['detailService'];
      this.demandes = data['detailService'].Demandes
    });

  }

  sendDemandeServices() {
    // this.sendData.sendData(this.service)
  }

  sendLibelleService() {
    // this.sendData.send(this.service.libelle)
  }
}



