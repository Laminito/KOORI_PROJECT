import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2';
import {error} from "jquery";
import * as $ from "jquery";
import { FicheService } from '../../_services/fiche.service';
import { SenddataService } from '../../_services/senddata.service';
import { AllRequestService } from '../../_services/all-request.service';
import { Koori } from '../../_models/koori';

@Component({
  selector: 'app-add-fiche',
  templateUrl: './add-fiche.component.html',
  styleUrls: ['./add-fiche.component.scss']
})
export class AddFicheComponent implements OnInit {
  submitted = false;
  addForm!: FormGroup;
  avatar: any;
  selectedDevice : number = 0;
  koori: Koori = new Koori()
  @ViewChild('closebutton') closebutton:any;
  url: any;
  constructor(private formBuilder: FormBuilder,
              private ficheService: FicheService,
              private senddata: SenddataService,
              private allRequest: AllRequestService) {
  }

  ngOnInit(): void {
    this.getPhases()
    this.addForm = this.formBuilder.group({
      IboxId: [0, Validators.required],
      phase: [0],
      titre: ['', Validators.required],
      sous_titre: ['', Validators.required],
      description: ['', Validators.required],
      dureeMin: ['', Validators.required],
      dureeMax: ['', Validators.required],
      equipeMin: ['', Validators.required],
      equipeMax: ['', Validators.required],
      outils: ['', Validators.required],
      prerequis: ['', Validators.required],
      file: [null],
      Etapes:this.formBuilder.array([],Validators.required)
    });
    //console.log(this.etapes.value.length)
  }
  delInput(index: number): void {
    const arrayControl = <FormArray>this.addForm.controls['Etapes'];
    arrayControl.removeAt(index);
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
  get f() {
    // @ts-ignore
    return this.addForm.controls;
  }
  getPhases(){
    this.allRequest.getAll("koori/last").subscribe((data:any)=>{
      this.koori = new Koori().deserialize(data)
    })
  }
  onChange(newValue: number) {
    this.selectedDevice = newValue;
  }
  resetEtapesValues(i: number) {
    this.etapes.controls[i].patchValue(
      {
        titre: '',
        description: ''
      }
    );
  }
  onSubmit(){
    this.submitted = true;
    if(this.addForm.valid){
    this.addForm.get('IboxId')?.setValue(this.senddata.getId())
      this.addForm.get('phase')?.setValue(this.selectedDevice)
    const {IboxId, titre, sous_titre, description, prerequis, outils,
      dureeMin, dureeMax, equipeMin, equipeMax, phase} = this.addForm.value;
    const fiche = new FormData();
      fiche.append('IboxId', IboxId);
      fiche.append('phase', phase);
    fiche.append('titre', titre);
    fiche.append('sous_titre', sous_titre);
    fiche.append('description', description);
    fiche.append('prerequis', prerequis);
    fiche.append('outils', outils);
    fiche.append('dureeMin', dureeMin);
    fiche.append('dureeMax', dureeMax);
    fiche.append('equipeMin', equipeMin);
    fiche.append('equipeMax', equipeMax);
    if(this.avatar){
      fiche.append('file', this.avatar);
    }
    for(let i=0; i< this.addForm.value.Etapes.length; i++){
      fiche.append('Etapes['+i+'][titre]', this.addForm.value.Etapes[i].titre)
      fiche.append('Etapes['+i+'][description]', this.addForm.value.Etapes[i].description)
    }
      //console.log(this.addForm.value)
    this.ficheService.postFiche(fiche).subscribe((data:any)=>{
      console.log(data)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Ajout effectue avec succès',
        showConfirmButton: false,
        timer: 3000
      })
    })
      this.closebutton.nativeElement.click();
      // @ts-ignore
      //$('.btn-evaluer').add('data-bs-dismiss', "modal")
      this.submitted = false;
      this.addForm.reset()
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
}
