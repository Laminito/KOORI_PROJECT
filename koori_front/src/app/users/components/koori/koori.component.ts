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
  evaluation_koori!: Evaluation_koori
  resources!:string
  
  constructor(private allRequest: AllRequestService,
              public loading: LoadingService,
              private senddata: SenddataService) 
              {
  }
  ngOnInit(): void {

    this.getDescriptionKoori()

    this.evaluation_koori = new Evaluation_koori()

    // this.kooriService.getLastKoori().subscribe((lastKoori:Koori)=>{
    //   this.evaluation_koori.KooriId =lastKoori.id
    //   console.log(lastKoori.id)
    //   this.evaluation_koori.UserId = 1  
    //   this.resources = `evaluation_koori/user/${this.evaluation_koori.UserId}/koori/${this.evaluation_koori.KooriId}`
    // })

    this.evaluation_koori.KooriId = 1
    this.evaluation_koori.UserId = 3 
    this.resources = `evaluation_koori/user/${this.evaluation_koori.UserId}/koori/${this.evaluation_koori.KooriId}`
    
    
  }
  getDescriptionKoori(){
    this.allRequest.getAll("koori/last").subscribe((data:any)=>{
      this.koori = new Koori().deserialize(data)
      this.senddata.setId(this.koori.id)
    })
  }
}

