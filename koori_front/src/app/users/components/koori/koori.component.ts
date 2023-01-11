import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Evaluation_koori } from '../../_models/evaluation_koori';
import { Koori } from '../../_models/koori';
import { AllRequestService } from '../../_services/all-request.service';
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
              private kooriService: KooriService) 
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
    console.log(lastKoori.id)
    this.evaluation_koori.UserId = 1  //ON DEVRA PRENDRE INCHALLAH L'ID DU USER QUI SE CONNECTE. CECI N'EST QU'UN TEST
    this.resources = `evaluation_koori/user/${this.evaluation_koori.UserId}/koori/${this.evaluation_koori.KooriId}`
    })
    this.evaluation_koori.KooriId = 1
    this.evaluation_koori.UserId = 3 //DOIT VENIR DU TOKEN 
    this.resources = `evaluation_koori/user/${this.evaluation_koori.UserId}/koori/${this.evaluation_koori.KooriId}`
    
    
  }
  getDescriptionKoori(){
    this.allRequest.getAll("koori/last").subscribe((data:any)=>{
      this.koori = new Koori().deserialize(data)
      this.senddata.setId(this.koori.id)
    })
  }
}

