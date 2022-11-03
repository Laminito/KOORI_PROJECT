import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, NavigationExtras, Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Fiche } from '../../_models/fiche';
import { LoadingService } from '../../_services/loading.service';
import { SenddataService } from '../../_services/senddata.service';
declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent implements OnInit {
  fiche: any
  fiches: Fiche[]=[]
  p=1
  constructor(private route: ActivatedRoute,
              public loading: LoadingService,
              private senddata: SenddataService,
              private _route: Router)
  {
    this.route.
    data.subscribe(
      (data: Data) => {
        this.fiche = data['fiche'];
      }
    );
  }
  ngOnInit(): void {
    this.fiches = this.senddata.getdata()
  }
  downloadPdf() {
    const pdfUrl = './assets/Votre_livret.pdf';
    const pdfName = 'Votre_livret';
    FileSaver.saveAs(pdfUrl, pdfName);
  }
  navigate(id:number,tab: any){
    this.senddata.setData(tab)
    this._route.navigate([`/home/fiche/${id}`], tab)
  }
  exportHtmlToPDF(fic: Fiche){
    let data = document.getElementById('lafiche');
    // @ts-ignore
    html2canvas(data).then(canvas => {
      let docWidth = 208;
      let docHeight = canvas.height * docWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let doc = new jsPDF.jsPDF('p', 'mm', 'a4');
      let position = 0;
      doc.addImage(contentDataURL, 'PNG', 0, position, docWidth, docHeight)
      doc.save(`${fic.titre}.pdf`);
    });
  }
  goTo(tab: Fiche[]){
    //this.senddata.setDataScroll(tab, true)
    //console.log(this.senddata.getDataScroll())
    // @ts-ignore
    this._route.navigate([`/ibox`], this.senddata.getDataScroll())
  }
}


