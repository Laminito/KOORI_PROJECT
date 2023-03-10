import {Component, Input, OnInit} from '@angular/core';
import {data} from "jquery";
import { Rapport } from 'src/app/admin/_models/rapport';
import { AllRequestService } from 'src/app/admin/_services/all-request.service';
import { SenddataService } from 'src/app/admin/_services/senddata.service';

@Component({
  selector: 'app-item-rapport',
  templateUrl: './item-rapport.component.html',
  styleUrls: ['./item-rapport.component.scss']
})
export class ItemRapportComponent implements OnInit {
 @Input() rapportItem: Rapport = new Rapport;
 @Input() rapports: Rapport[] = [];
  participants: any
  constructor(private allRquest: AllRequestService, private sendData: SenddataService) { }

  ngOnInit(): void {
    this.getParticipants();
    this.rating()
  }

  getParticipants(){
    this.allRquest.getAll(`rapport/${this.rapportItem.id}/participants/`).subscribe(data=>{
      this.participants= data;
    })
  }

  rating(){
    const rating = (document.querySelectorAll('.rating'));
    console.log(rating.length)

      for (let i = 0; i < rating.length; i++) {
        for (let j = 9; j > 9 - (Math.floor(Math.floor(<number>this.rapports[i].moyenne) / 2)); j--) {
          (<HTMLElement>rating[i].childNodes[j]).style.color = "orange"
        }
    }
  }

  b64toBlob(b64Data: any, contentType = 'application/pdf'): any {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
  }

  openProgramme(): any {
    const file = this.b64toBlob(this.rapportItem.file);
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  }

  changeMessage(message: any) {
    this.sendData.messageSource.next(message)
  }

  getSessionByRapport(id:any) {
   this.allRquest.getById(`session/rapport/`,id).subscribe(data=>{
       console.log(data)
      //  this.sendData.sendData(data)
   },
     error => {
       console.log(error.message)
     })
  }
}
