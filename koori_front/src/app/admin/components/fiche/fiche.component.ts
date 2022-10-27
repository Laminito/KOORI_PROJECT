import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Data, Router } from '@angular/router';
import * as $ from "jquery";
import * as jsPDF from 'jspdf';
declare var require: any
const FileSaver = require('file-saver');
import html2canvas from 'html2canvas';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import { Fiche } from '../../_models/fiche';
import { Evaluation_ibox } from '../../_models/evaluation_ibox';
import { User } from '../../_models/user';
import { SenddataService } from '../../_services/senddata.service';
import { FicheService } from '../../_services/fiche.service';
import { Etape } from '../../_models/etape';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.scss']
})
export class FicheComponent implements OnInit {
  @ViewChild('closebutton') closebutton:any;
  addForm!: FormGroup;
  fiche: any
  fiches: Fiche[]=[]
  title:string = ''
  submitted = false;
  p=1
  p1=1
  avatar: any;
  tab: Evaluation_ibox[] = []
  Users: User[] = []
  url: any
  constructor(private route:ActivatedRoute,
              private senddata: SenddataService,
              private _route: Router,
              private formBuilder: FormBuilder,
              private ficheService: FicheService)
  {

    this.title = 'Ibox'
    this.route.
    data.subscribe(
      (data: Data) => {
        this.fiche = data['fiche'];
        this.getEvaluations(this.fiche.id)
        let arr = this.PatchEtape(this.fiche.Etapes)
        this.addForm = this.formBuilder.group({
          IboxId: [this.fiche.IboxId, Validators.required],
          titre: [this.fiche.titre, Validators.required],
          sous_titre: [this.fiche.sous_titre, Validators.required],
          description: [this.fiche.description, Validators.required],
          dureeMin: [this.fiche.dureeMin, Validators.required],
          dureeMax: [this.fiche.dureeMax, Validators.required],
          equipeMin: [this.fiche.equipeMin, Validators.required],
          equipeMax: [this.fiche.equipeMax, Validators.required],
          outils: [this.fiche.outils, Validators.required],
          prerequis: [this.fiche.prerequis, Validators.required],
          file: [this.fiche.avatar],
          Etapes:this.formBuilder.array(arr,Validators.required)
        });
      }
    );
  }

ngOnInit(): void {
    this.fiches = this.senddata.getdata()
  }
  navigate(id?:number,tab?:any){
    this.senddata.setData(tab)
    this._route.navigate([`/fiche/${id}`], tab)
  }
  downloadPdf() {
    const pdfUrl = './assets/Votre_livret.pdf';
    const pdfName = 'Votre_livret';
    FileSaver.saveAs(pdfUrl, pdfName);
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
  delInput(index: number): void {
    Swal.fire({
      title: 'Etes vous sure de la suppression?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--vert)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprime!'
    }).then((result) => {
      if (result.isConfirmed) {
        const arrayControl = <FormArray>this.addForm.controls['Etapes'];
        arrayControl.removeAt(index);
        /*Swal.fire(
          'Suppression!',
          'Etape supprimee avec succes'
        )*/
      }
    })
  }
  get etapes():FormArray{
    return <FormArray> this.addForm.get('Etapes');
  }
  addEtape() {
    this.etapes.push(this.createEtape());
  }
  createEtape():FormGroup{
    return this.formBuilder.group({
      titre:['',Validators.required],
      description:['',Validators.required]
    })
  }
  PatchEtape(tabEt: Etape[]){
    let tab =[]
    let fg : any
    for(let i=0; i< tabEt.length; i++){
      fg = this.formBuilder.group({
        titre:[tabEt[i].titre,Validators.required],
        description:[tabEt[i].description,Validators.required]
      })
      tab.push(fg)
    }
    return tab
  }
  resetEtapesValues(i: number) {
    this.etapes.controls[i].patchValue(
      {
        titre: '',
        description: ''
      }
    );
  }
  get f()
  {
    // @ts-ignore
    return this.addForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.addForm.valid){
      const {titre, sous_titre, description, prerequis, outils,
        dureeMin, dureeMax, equipeMin, equipeMax} = this.addForm.value;
      const updateFiche = new FormData();
      updateFiche.append('titre', titre);
      updateFiche.append('sous_titre', sous_titre);
      updateFiche.append('description', description);
      updateFiche.append('prerequis', prerequis);
      updateFiche.append('outils', outils);
      updateFiche.append('dureeMin', dureeMin);
      updateFiche.append('dureeMax', dureeMax);
      updateFiche.append('equipeMin', equipeMin);
      updateFiche.append('equipeMax', equipeMax);
      updateFiche.append('file', this.avatar);
      for(let i=0; i< this.addForm.value.Etapes.length; i++){
        updateFiche.append('Etapes['+i+'][titre]', this.addForm.value.Etapes[i].titre)
        updateFiche.append('Etapes['+i+'][description]', this.addForm.value.Etapes[i].description)
      }
      this.ficheService.updateFiche(this.fiche.id, updateFiche).subscribe((data:any)=>{
        this.fiche = new Fiche()
        this.fiche = data
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Modification reussie',
          showConfirmButton: false,
          timer: 3000
        })
        this.submitted = false;
        this.addForm.reset()
      })
      this.closebutton.nativeElement.click();
      //$('.btn-evaluer').attr('data-bs-dismiss', 'modal')
      //console.log($('.btn-evaluer')[0].getAttribute('data-bs-dismiss'))
    }
  }
  onSelectFile(event:any) {
    /*if (event.target.files && event.target.files[0]) {
      this.avatar = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:no-shadowed-variable
      /!*reader.onload = (event: any) => { // called once readAsDataURL is completed
        //this.url = event.target.result;
      };*!/
    }*/
    var curElement = $(this).parent().parent().find('.image');
    console.log(curElement);
    var reader = new FileReader();
    this.avatar = event.target.files[0];
    reader.onload = function (e) {
      // @ts-ignore
      curElement.attr('src', e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => { // called once readAsDataURL is completed
      this.url = event.target.result;
    };
  }
  getEvaluations(id:any){
    while(this.tab.length > 0) {
      this.tab.pop();
    }
    while(this.Users.length > 0) {
      this.Users.pop();
    }
    this.ficheService.getEvaluations(id).subscribe((data: any)=>{
      this.tab = data
      for(let u of this.tab){
        // @ts-ignore
        this.Users.push(u['User'])
      }
    })
  }
}
