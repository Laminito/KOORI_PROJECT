import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Evaluation_koori } from '../../_models/evaluation_koori';
import { Koori } from '../../_models/koori';
import { AllRequestService } from '../../_services/all-request.service';
import { AuthService } from '../../_services/auth.service';
import { KooriService } from '../../_services/koori.service';
import { LoadingService } from '../../_services/loading.service';
import { SenddataService } from '../../_services/senddata.service';


@Component({
  selector: 'app-koori',
  templateUrl: './koori.component.html',
  styleUrls: ['./koori.component.css']
})
export class KooriComponent implements OnInit {

  koori: Koori = new Koori()
  title: string = ""
  suite: string = ""
  evaluation_koori!: Evaluation_koori
  resources!:string
  constructor(private allRequest: AllRequestService, private route:ActivatedRoute,
              public loading: LoadingService,
              private senddata: SenddataService,
              private kooriService: KooriService,
              private authService: AuthService) 
              {
    this.title = route.snapshot.data['title']
    this.suite = route.snapshot.data['suite']
  }
  ngOnInit(): void {
    this.route.data.subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      (data: Data) => {
        this.title = data['title'];
        this.suite = data['suite'];
      }
    );
    this.getDescriptionKoori()

    this.evaluation_koori = new Evaluation_koori()
    this.kooriService.getLastKoori().subscribe((lastKoori:Koori)=>{
    this.evaluation_koori.KooriId =lastKoori.id
    this.evaluation_koori.UserId = Number(this.authService.getIdUserConnected())//DOIT VENIR DU TOKEN 
    this.resources = `evaluation_koori/user/${this.evaluation_koori.UserId}/koori/${this.evaluation_koori.KooriId}`
    })
    
  }
  getDescriptionKoori(){
    this.allRequest.getAll("lastkoori/").subscribe((data:any)=>{
      this.koori = new Koori().deserialize(data)
      this.senddata.setId(this.koori.id)
    })
  }
}

