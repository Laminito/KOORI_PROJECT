import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Koori } from '../../_models/koori';
import { AllRequestService } from '../../_services/all-request.service';
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
  constructor(private allRequest: AllRequestService, private route:ActivatedRoute,
              public loading: LoadingService,
              private senddata: SenddataService) {
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
  }
  getDescriptionKoori(){
    this.allRequest.getAll("get/koori/last").subscribe((data:any)=>{
      this.koori = new Koori().deserialize(data)
      //console.log(this.koori)
      // this.senddata.setId(this.koori.id)
    })
  }
}
