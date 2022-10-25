import { Component, OnInit } from '@angular/core';
import 'lodash';
import * as $ from "jquery";
declare var _ :any;
import * as XLSX from 'xlsx';
import { Demande } from '../../_models/demande';
import { ActivatedRoute, Data } from '@angular/router';
import { AllRequestService } from '../../_services/all-request.service';
import { DemandeService } from '../../_services/demande.service';
import { SenddataService } from '../../_services/senddata.service';


@Component({
  selector: 'app-liste-demande',
  templateUrl: './liste-demande.component.html',
  styleUrls: ['./liste-demande.component.scss']
})
export class ListeDemandeComponent implements OnInit {

  demandes: Demande[] = [];
  libelleServiceDemande: any;
  //lalla: Demande[]=[];
  id: number = 0
  data: [][] = [];
  input1: any
  modal: any
  noPen = ['nouvelle', 'traitee', 'rejetee', 'annulee']
  couleur = {
    '#344DA8': 'nouvelle',
    '#258F49': 'traitee',
    '#256F49': 'validee',
    '#CA8654': 'rejetee',
    '#FF7713': 'en attente',
    '#FF0000': 'annulee'
  }
  color: string[] = []

  constructor(private route: ActivatedRoute,
              private demandeService: DemandeService, private getData: SenddataService, private allRequest: AllRequestService) {
  }

  ngOnInit(): void {
    //this.receive()
    this.getDemande()

    this.getData.receiveData().subscribe(data => {
      this.libelleServiceDemande = data
      this.demandes = data.Demandes
      console.log(this.libelleServiceDemande);

    })
  }

  receive() {
    this.route.data.subscribe((data: Data) => {
      this.demandes = data['listeDemande'].map((demande: Demande) => new Demande().deserialize(demande));
    });
  }

  // getDemande(){
  //   this.demandeService.getDemandesByServiceId().subscribe((data:any)=>{
  //     console.log(data);

  //     this.demandes=data})
  // this.getData.receiveData().subscribe(data =>{
  //   this.libelleServiceDemande=data
  //   //this.demandes =data.Demandes
  //  // console.log(this.libelleServiceDemande);

  // })

  // receive(){
  //   this.route.data.subscribe((data: Data) => {
  //     this.demandes = data['listeDemande'].map((demande:Demande)=>new Demande().deserialize(demande));
  //   });
  // }
  getDemande() {
    this.demandeService.getDemandesByServiceId().subscribe((data: any) => {
      console.log(data);
      this.demandes = data.map((demande: Demande) => new Demande().deserialize(demande));

      //this.demandes=data
    })
  }

  changeStatut(event: any) {
    //alert('ok');
    let id = event.target.getAttribute('id')
    if (id) {
      let span = $(`#statut${id} span`)
      let circle = $(`#statut${id} i`)
      $(`#statut${id}`).empty()
      if (span.text() === 'En attente') {
        this.input1 = $("<select class='form-select' style='border-color: var(--vert);\n" +
          "border: solid 1px var(--vert); box-shadow: 0 0 0 0.1rem var(--vert); outline: none;'>" +
          "<option value='validee'>Validee</option>" +
          "<option value='annulee'>Annulee</option>" +
          "<option value='Traitee'>Annulee</option>" +
          "</select>")
      } else {
        if (span.text() === 'Nouvelle') {
          this.input1 = $("<select class='form-select' style='border-color: var(--vert);\n" +
            "border: solid 1px var(--vert); box-shadow: 0 0 0 0.1rem var(--vert); outline: none;'>" +
            "<option value='en attente'>En attente</option>" +
            "<option value='rejetee'>Rejetee</option>")
        }
      }
      let label = $("<label class='text-wrap mt-2 fw-bold'>Sujet</label>")
      let text = $("<textarea class='text-wrap mt-2' style='background: #ECECEC;\n" +
        "box-shadow: 0 0 0 0.1rem var(--vert);\n" +
        "border-radius: 5px;\n" +
        "border: solid 1px var(--vert); width: 100%'></textarea>")
      this.input1.appendTo($(`#statut${id}`));
      label.appendTo($(`#statut${id}`));
      text.appendTo($(`#statut${id}`));
      $(`#${id}`).off('click').removeClass('fa-pencil-alt').addClass(`fa-check fa-check${id}`)
      $(`.fa-check${id}`).removeAttr('id')
      $(`.fa-check${id}`).css("color", "green").parent().addClass(`btn${id}`).off('click')

      $(`.btn${id}`).on('click', () => {
        let obj = {
          statut: this.input1.val(),
          text: text.val(),
        }
        this.demandeService.updateDemande(id, obj).subscribe((data: any) => {
          const key = _.findKey(this.couleur, function (v: string) {
            return v === data.statut.toLowerCase();
          });

          this.input1.hide()
          label.hide()
          text.hide()
          $(`#statut${id}`).show()
          circle.css('color', key)
          circle.appendTo($(`#statut${id}`))
          span.appendTo($(`#statut${id}`)).text(data?.statut)
          if (data?.statut == 'Traitee' || data?.statut == 'Rejetee' || data?.statut == 'annulee') {
            $(`.fa-check${id}`).remove()
            $(`.btn${id}`).remove()
            $(`.fa-check${id}`).off('click')
          } else if (data?.statut == 'Validee') {
            $(`.fa-check${id}`).removeClass('fa-check').addClass('fa-file-excel fa-2x')
            $(`.fa-file-excel${id}`).css("color", "green")
            $(`.fa-file-excel${id}`).off('click')
          } else {
            $(`.fa-check${id}`).removeClass('fa-check').addClass('fa-pencil-alt')
            $(`.fa-check${id}`).css("color", "#FFA000")
            $(`.fa-check${id}`).off('click')
          }

        })
      })
    }

  }


  downloadExcelFile(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      // console.log(ws);
      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
    };
    reader.readAsBinaryString(target.files[0]);

  }

  async getParticipant() {
    var tabb: any = []
    await this.data.forEach(tab => {
      var obj: any = {
        nomComplet: '',
        email: '',
        profession: '',
        service: '',
        departement: '',
        direction: ''
      }
      if (tab.length) {
        for (const property in obj) {
          obj[property] = tab[(Object.keys(obj)).findIndex((key: any) => key == property)]
        }
        tabb.push(obj)
      }
    })
    tabb.shift();
    this.allRequest.postData('add/participants/', tabb).subscribe(data => {
      console.log(data)
    })
  }
}
