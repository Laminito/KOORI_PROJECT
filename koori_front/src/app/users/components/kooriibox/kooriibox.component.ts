import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Ibox } from '../../_models/ibox';
import { Koori } from '../../_models/koori';
import { AllRequestService } from '../../_services/all-request.service';
import { LoadingService } from '../../_services/loading.service';
declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-koori',
  templateUrl: './kooriibox.component.html',
  styleUrls: ['./kooriibox.component.css']
})
export class KooriiboxComponent implements OnInit {

  koori: Koori = new Koori()
  ibox: Ibox = new Ibox()
  constructor(private allRequest: AllRequestService,
              public loading: LoadingService) {
  }

  ngOnInit(): void {
    //contributeurs
    $(function($) {
      // js for carousel
      let items = document.querySelectorAll('.partner .carousel .carousel-item')
      items.forEach((el) => {
        const minPerSlide = 3
        let next = el.nextElementSibling
        for (let i=1; i<minPerSlide; i++) {
          if (!next) {
            next = items[0]
          }
          let cloneChild = next.cloneNode(true)
          el.appendChild(cloneChild.childNodes[0])
          next = next.nextElementSibling
        }
      })
    });
    this.getDescriptionKoori()
    this.getDescriptionIbox()
  }
  getDescriptionKoori(){
    this.allRequest.getAll("koori/last","description").subscribe((data:any)=>{
      this.koori = new Koori().deserialize(data)
    })
  }
  getDescriptionIbox(){
    this.allRequest.getAll("ibox/last","description").subscribe((data:any)=>{
      this.ibox = new Ibox().deserialize(data)
      //console.log(this.ibox)
    })
  }
  downloadPdf() {
    const pdfUrl = './assets/Votre_livret.pdf';
    const pdfName = 'Votre_livret';
    FileSaver.saveAs(pdfUrl, pdfName);
  }
}
