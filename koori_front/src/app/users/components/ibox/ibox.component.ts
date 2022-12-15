import {Component,  OnInit } from '@angular/core';
import {ActivatedRoute, Data, Router } from '@angular/router';

import * as $ from 'jquery';
import 'lodash';

import { Subscription } from 'rxjs';
import { Evaluation_ibox } from '../../_models/evaluation_ibox';
import { Fiche } from '../../_models/fiche';
import { Ibox } from '../../_models/ibox';
import { Koori } from '../../_models/koori';
import { Phase } from '../../_models/phase';
import { AllRequestService } from '../../_services/all-request.service';
import { AuthService } from '../../_services/auth.service';
import { IboxService } from '../../_services/ibox.service';
import { LoadingService } from '../../_services/loading.service';
import { SenddataService } from '../../_services/senddata.service';
declare var _:any;

@Component({
  selector: 'app-ibox',
  templateUrl: './ibox.component.html',
  styleUrls: ['./ibox.component.css']
})
export class IboxComponent implements OnInit {

  ibox: Ibox = new Ibox()
  phases: Phase[] = []
  fiches: Fiche[] = []
  Data: Fiche[] = []
  title: string = ""
  suite: string = ""
  key: string = ""
  value: string[][] = []
  prerequis: string[] = []
  prerequisUniq: string[] = []
  outils: string[] = []
  outilsUniq: string[] = []
  duree: {min: number, max: number}[] = []
  dureeUniq: {min: number, max: number}[] = []
  equipe: {min: number, max: number}[] = []
  equipeUniq: {min: number, max: number}[] = []
  phase : string = ""
  k :string[] = []
  v: string[][] = []
  count: number = 0;
  p=1
evaluation_ibox!:Evaluation_ibox
resources!:string
  constructor(private allRequest: AllRequestService,
              private route:ActivatedRoute,
              private _route: Router,
              private senddata: SenddataService,
              public loading: LoadingService,
              private iboxservice: IboxService,
              private iboxService: IboxService,
              private authService:AuthService){
  }

  ngOnInit(): void {

    this.evaluation_ibox = new Evaluation_ibox()
    this.iboxService.getLastIbox().subscribe((lastibox:Ibox)=>{
    this.evaluation_ibox.IboxId =lastibox.id
    this.evaluation_ibox.UserId = Number(this.authService.getIdUserConnected())//DOIT VENIR DU TOKEN 
    this.resources = `evaluation_ibox/user/${this.evaluation_ibox.UserId}/ibox/${this.evaluation_ibox.IboxId}`
     })


    this.route.data.subscribe(
      (data: Data) => {
        this.title = data['title'];
        this.suite = data['suite'];
      }
    );
    this.getIbox()
    this.getPhases()
    if (this.senddata.getDataScroll()['boolean'] === true){
      this.deleteTab(this.fiches)
      this.fiches = this.senddata.getDataScroll()['temp']
    }
    else{
      this.fiches = this.getData()
    }
  }

  Scroll(){
    console.log('scrolling')
    // @ts-ignore
    // document.querySelector('#fichessss').scrollIntoView();
  }

  getData(){
    this.iboxservice.getPhasesFiches().subscribe((data:any)=>{
      for (let pf of data){
        this.Data.push(pf.Fiche)
      }
      //console.log(this.Data)
    })
    return this.Data
  }

  getIbox(){
    this.allRequest.getAll("lastibox/").subscribe((data:any)=>{
      this.ibox = new Ibox().deserialize(data)
      // @ts-ignore
      for (let f of this.ibox.Fiches){
        // @ts-ignore
        this.prerequis.push(f.prerequis)
        // @ts-ignore
        this.outils.push(f.outils)
        this.duree.push(
          {min: f.dureeMin, max: f.dureeMax}
        )
        this.equipe.push({min:f.equipeMin, max:f.equipeMax})
      }
      this.prerequisUniq = _.uniq(this.prerequis)
      this.outilsUniq = _.uniq(this.outils)
      this.dureeUniq = this.duree.filter((thing, index, self) =>
          index === self.findIndex((t) => (
            t['min'] === thing['min'] && t['max'] === thing['max']
          ))
      )
      this.equipeUniq = this.equipe.filter(
        (thing1, index1, self1) =>
          index1 === self1.findIndex((t1) => (
            t1['min'] === thing1['min'] && t1['max'] === thing1['max']
          ))
      )
    })
  }
  getPhases(){
    this.allRequest.getAll("koori/last").subscribe((data:any)=>{
      this.phases = _.orderBy(new Koori().deserialize(data).Phases, ['id'], ['asc'])
    })
  }
  // cest le cas ou phase n'est pas definie et qu'il ya des selctions de l'autre cote
  getValue(event: any){
    this.fiches = this.getData()
    console.log(event.target.parentNode.parentNode.getAttribute('class').split('row')[1].trim())
    let chaine = event.target.parentNode.parentNode.getAttribute('class').split('row')[1].trim()
    $(`.col-attribut .${chaine} button`).removeClass('active')
    event.target.className += " active"
    //recolte value, cle, valeur
    this.deleteTab(this.value)
    this.value = this.checkValues($('.col-attribut button.active'))
    this.deleteTab(this.k)
    this.deleteTab(this.v)
    for (let i=0; i<this.value.length;i++){
      this.k.push(this.value[i][0].trim().split(':')[0].trim())
      this.v.push([this.value[i][0].trim().split(':')[1].trim()])
    }
    //filtre: cas ou phase n'est pas definie et qu'il ya des selctions de l'autre cote
    // @ts-ignore
    if ($(`.phase button.active`).get()[0].getAttribute('id').includes('tout')){
      let tab: Fiche[] = []
      // tab = this.search(this.fiches, this.k, this.v)
      this.deleteTab(this.fiches)
      this.fiches = tab
    }
    //filtre: cas ou phase est pas definie et qu'il ya des selctions de l'autre cote
    else{
      // @ts-ignore
      this.phase = $(`.phase button.active`).get()[0].textContent.trim()
      this.iboxservice.getPhasesFiches().subscribe((data:any)=>{
        let tab1 : Fiche[] = []
        for(let d of data){
          if (d.Phase.titre.trim() === this.phase){
            tab1.push(d.Fiche)
          }
        }
        this.deleteTab(this.fiches)
        // this.fiches = this.search(tab1, this.k, this.v)
      })
    }
  }
  // cest le cas ou phase est definie et qu'il n'ya pas de selctions
  getCaract(cl: string){
    this.count = 0
    let id =$(`.${cl}`).get()[0].getAttribute('id')
    $(`.phase button.active`).removeClass('active')
    $(`.${cl}`).addClass('active')
    for (let btn of $('.col-attribut button.active')){
      // @ts-ignore
      if (btn.getAttribute('id').includes('tout')){
        this.count ++
      }
    }
    if (this.count === 4){
      this.iboxservice.getPhasesFiches().subscribe((data:any)=>{
        let tab5 : Fiche[] = []
        for(let d of data){
          if (d.Phase.titre.trim() === cl){
            tab5.push(d.Fiche)
          }
        }
        this.deleteTab(this.fiches)
        this.fiches = tab5
      })
    }
    else{
      this.deleteTab(this.value)
      this.value = this.checkValues($('.col-attribut button.active'))
      this.deleteTab(this.k)
      this.deleteTab(this.v)
      for (let i=0; i<this.value.length;i++){
        this.k.push(this.value[i][0].trim().split(':')[0].trim())
        this.v.push([this.value[i][0].trim().split(':')[1].trim()])
      }
      this.phase = cl
      this.iboxservice.getPhasesFiches().subscribe((data:any)=>{
        let tab1 : Fiche[] = []
        for(let d of data){
          if (d.Phase.titre.trim() === this.phase){
            tab1.push(d.Fiche)
          }
        }
        this.deleteTab(this.fiches)
        // this.fiches = this.search(tab1,this.k, this.v)
      })
    }
  }
  // c'est le cas ou l'on considere toute les phases
  getDefault(){
    this.count = 0
    for (let btn of $('.phase button.active')){
      // @ts-ignore
      if (!btn.getAttribute('id').includes('tout')){
        $(`.phase button#${btn.getAttribute('id')}`).removeClass('active')
        $(`#phasetout`).addClass('active')
      }
    }
    for (let btn of $('.col-attribut button.active')){
      // @ts-ignore
      if (btn.getAttribute('id').includes('tout')){
        this.count++
      }
    }
    if (this.count === 4){
      this.deleteTab(this.fiches)
      this.fiches = this.getData()
    }
    else{
      this.deleteTab(this.value)
      this.value = this.checkValues($('.col-attribut button.active'))
      this.deleteTab(this.k)
      this.deleteTab(this.v)
      for (let i=0; i<this.value.length;i++){
        this.k.push(this.value[i][0].trim().split(':')[0].trim())
        this.v.push([this.value[i][0].trim().split(':')[1].trim()])
      }
      if (this.value.length === 0){
        this.deleteTab(this.fiches)
        this.fiches = this.getData()
      }
      else{
        this.deleteTab(this.fiches)
        this.fiches = this.getData()
        // let tab12 = this.search(this.fiches, this.k, this.v)
        this.deleteTab(this.fiches)
        // this.fiches = tab12
      }
    }
  }
  // cest le cas ou l'on considere toutes les valeurs possibles d'un attribut
  getDefaultCaract(str: string) {
    this.count = 0
    $(`.${str} button.active`).removeClass('active')
    $(`#${str}tout`).addClass('active')
    //console.log(this.value)
    let index:number
    for (let v of this.value){
      if (v[0].trim().split(':')[0].trim() === str) {
        index = this.value.indexOf(v)
      }
    }
    // @ts-ignore
    this.value.splice(index, 1)
    for (let btn of $('.col-attribut button.active')){
      // @ts-ignore
      if (btn.getAttribute('id').includes('tout')){
        this.count ++
      }
    }
    // @ts-ignore
    if($('.phase button.active').get()[0].getAttribute('id').includes('tout')){
      if (this.count === 4){
        this.iboxservice.getPhasesFiches().subscribe((data:any)=>{
          let tab6 : Fiche[] = []
          for(let d of data){
            tab6.push(d.Fiche)
          }
          this.deleteTab(this.fiches)
          this.fiches = tab6
        })
      }
      else{
        let tab9 = this.getData()
        this.deleteTab(this.fiches)
        // this.fiches = this.search(tab9, this.k, this.v)
      }
    }
    else{
      if (this.count === 4){
        this.iboxservice.getPhasesFiches().subscribe((data:any)=>{
          let tab10 : Fiche[] = []
          for(let d of data){
            if (d.Phase.titre.trim() === $('.phase button.active').get()[0].textContent){
              tab10.push(d.Fiche)
            }
          }
          this.deleteTab(this.fiches)
          this.fiches = tab10
        })
      }
      else{
        this.iboxservice.getPhasesFiches().subscribe((data:any)=>{
          let tab10 : Fiche[] = []
          for(let d of data){
            if (d.Phase.titre.trim() === this.phase){
              tab10.push(d.Fiche)
            }
          }
          this.deleteTab(this.fiches)
          // this.fiches = this.search(tab10, this.k, this.v)
        })
      }
    }
  }
  checkValues(tab: JQuery<HTMLElement>){
    for (let btn of tab){
      // @ts-ignore
      if (!btn.getAttribute('id').includes('tout')){
        let id = btn.getAttribute('id')
        // @ts-ignore
        this.key = id.substring(0, id.indexOf('_'))
        let val = String(btn.textContent)
        if (val.includes('min')){
          this.value.push([this.key + ':' + val.split(' min')[0].split(' - ')])
        }
        else{
          if (val.includes('-')){
            this.value.push([this.key + ':' + val.split(' - ')])
          }
          else {
            this.value.push([this.key + ':' + val])
          }
        }
      }
    }
    return this.value
  }
  deleteTab(tab :any[]){
    while(tab.length > 0) {
      tab.pop();
    }
  }
  TabHTML(tab :JQuery<HTMLElement>[]){
    for(let i=0; i<tab.length;i++){
      tab[i].removeClass('active')
    }
  }
  activeTabHTML(tab :JQuery<HTMLElement>[],tab1 :JQuery<HTMLElement>[]){
    $(`.Definition`).addClass('active')
    /*for(let i=0; i<tab[0].length;i++){
      // @ts-ignore
      if(tab[0][i].textContent.trim() === 'Definition'){
        //tab[0][i].classList.remove('active')
      }
    }*/
  }
  // search(tab: Fiche[], k: string[], v:string[][]){
  //   let tab2: Fiche[] = []
  //   for (let f of tab){
  //     let bool : boolean = true
  //     for (let i=0;i<k.length;i++){
  //       if(k[i].trim() === "duree" || k[i].trim() === "equipe"){
  //         if (v[i][0].trim().split(',').length !== 1){
  //           if(parseInt(f[k[i]+'Min']) !== parseInt(v[i][0].trim().split(',')[0])
  //             && parseInt(f[k[i]+'Max']) !== parseInt(v[i][0].trim().split(',')[1])){
  //             bool = false
  //           }
  //           else{
  //             if (parseInt(f[k[i]+'Min']) !== parseInt(v[i][0].trim().split(',')[0])
  //               || parseInt(f[k[i]+'Max']) !== parseInt(v[i][0].trim().split(',')[1])){
  //               bool = false
  //             }
  //           }
  //         }
  //         else{
  //           if(parseInt(f[k[i]+'Min']) !== parseInt(v[i][0].trim())
  //             && parseInt(f[k[i]+'Max']) !== parseInt(v[i][0].trim())){
  //             bool = false
  //           }
  //         }
  //       }
  //       else{
  //         if(f[k[i].trim()].trim() !== v[i][0].trim()){
  //           bool = false
  //         }
  //       }
  //     }
  //     if (bool){
  //       tab2.push(f)
  //     }
  //   }
  //   return tab2
  // }
  navigate(id:number, tab: any){
    this.senddata.setData(tab)
    this.senddata.setHtml($(`.phase button.active`))
    this._route.navigate([`/home/fiche/${id}`], tab)
  }
}
