import { Component, OnInit } from '@angular/core';
import { Ibox } from 'src/app/users/_models/ibox';
import { Koori } from 'src/app/users/_models/koori';
import { AllRequestService } from 'src/app/users/_services/all-request.service';

@Component({
  selector: 'app-detail-kooriibox',
  templateUrl: './detail-kooriibox.component.html',
  styleUrls: ['./detail-kooriibox.component.css']
})
export class DetailKooriiboxComponent implements OnInit {

  koori!: Koori
  ibox!: Ibox

  constructor(private allRequest: AllRequestService,) { }

  ngOnInit(): void {
    this.allRequest.getAll("koori/last","description").subscribe((data:any)=>{
      this.koori = new Koori().deserialize(data)
      console.log(this.koori)
    })
    
    this.allRequest.getAll("ibox/last","description").subscribe((data:any)=>{
      this.ibox = new Ibox().deserialize(data)
      console.log(this.ibox);
    })
  }

}
