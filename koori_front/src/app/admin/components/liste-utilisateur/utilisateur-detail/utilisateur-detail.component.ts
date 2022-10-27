import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import 'lodash';
import * as $ from "jquery";
import { User } from 'src/app/admin/_models/user';
import { Demande } from 'src/app/admin/_models/demande';
import { Service } from 'src/app/admin/_models/service';
import { AllRequestService } from 'src/app/admin/_services/all-request.service';
import { UserService } from 'src/app/admin/_services/user.service';
import { DemandeService } from 'src/app/admin/_services/demande.service';

declare var _:any;

@Component({
  selector: 'app-utilisateur-detail',
  templateUrl: './utilisateur-detail.component.html',
  styleUrls: ['./utilisateur-detail.component.scss']
})
export class UtilisateurDetailComponent implements OnInit {
  titre: string = ''
  user: User = new User()
  demandes: Demande[] = []
  services: Service[] = []
  statut: string[] = []
  allservices: Service[] = []
  tab :[{ valeur: number; cle?: string; color: string }] =[{valeur: 0, cle: '', color: ''}]
  tabDem :[{ valeur: number; cle?: string }] =[{valeur: 0, cle: ''}]
  selectedDevice : number = 0;
  device : number = 0;
  input1: any
  tabcolor = ['#344DA8', '#258F49', '#256F49', '#CA8654', '#FF5733', '#5AA99A']
  noPen = ['nouvelle', 'traitee', 'rejetee', 'annulee']
  couleur = {'#344DA8' : 'nouvelle', '#258F49': 'traitee', '#256F49': 'validee', '#CA8654': 'rejetee', '#FF7713': 'en attente', '#FF0000': 'annulee'}
  color: string[] = []
  id: number =0
  p=1
  constructor(private allRequest: AllRequestService,
              private userservice: UserService,
              private demandeservice: DemandeService,
              private route:ActivatedRoute) {
    this.titre= "Utilisateur"
    this.route.url.subscribe((data)=>{
      this.id = parseInt(data[1].path)
      this.userservice.getUserById(this.id).subscribe((data:any)=>{
        this.user = data
      })
      this.userservice.getDemandesByUserId(this.id).subscribe((data1:any)=>{
        for(let d of data1){
          this.demandes.push(d)
          this.services.push(d.Service)
          if(!this.statut.includes(d.statut)){
            this.statut.push(d.statut)
          }
          const key = _.findKey(this.couleur, function (v: string) {
            return v === d.statut.toLowerCase();
          });
          this.color.push(key)
        }
        while(this.tabDem.length > 0) {
          this.tabDem.pop();
        }
        for (let st of this.statut){
          let a: number = 0
          for(let dem of this.demandes){
            if (st === dem.statut){
              a +=1
            }
          }
          this.tabDem.push({valeur: a, cle: st})
        }
      })
      this.allRequest.getAll("service/").subscribe((data:any)=>{
        this.allservices=data
        while(this.tab.length > 0) {
          this.tab.pop();
        }
        for(let as of this.allservices){
          let b: number = 0
          let col: string = this.tabcolor[~~(Math.random() * this.tabcolor.length)]
          for (let s of this.services){
            if (s.libelle?.trim() === as.libelle?.trim()){
              b +=1
            }
          }
          this.tab.push({valeur: b, cle: as.libelle, color: col})
        }
      })
    })
  }
  ngOnInit(): void {}
  onChange(newValue: number) {
    this.selectedDevice = newValue;
    while(this.demandes.length > 0) {
      this.demandes.pop();
    }
    while(this.services.length > 0) {
      this.services.pop();
    }
    while(this.color.length > 0) {
      this.color.pop();
    }
    if(this.selectedDevice ===0){
      this.userservice.getDemandesByUserId(this.id).subscribe((data:any)=>{
        for(let d of data){
          this.demandes.push(d)
          this.services.push(d.Service)
          const key = _.findKey(this.couleur, function (v: string) {
            return v === d.statut.toLowerCase();
          });
          this.color.push(key)
        }
      })
    }
    this.userservice.getDemandesByUserId(this.id).subscribe((data:any)=>{
      for(let d of data) {
        if(parseInt(d.ServiceId) == this.selectedDevice){
          this.demandes.push(d)
          this.services.push(d.Service)
          const key = _.findKey(this.couleur, function (v: string) {
            return v === d.statut.toLowerCase();
          });
          this.color.push(key)
        }
      }
    })
  }
  changeStatut(event:any){
    let id = event.target.getAttribute('id')
    if(id){
      let span = $(`#statut${id} span`)
      let circle =$(`#statut${id} i`)
      $(`#statut${id}`).empty()
      if(span.text() === 'En attente'){
        this.input1 = $("<select class='form-select' style='border-color: var(--vert);\n" +
          "border: solid 1px var(--vert); box-shadow: 0 0 0 0.1rem var(--vert); outline: none;'>" +
          "<option value='validee'>Validee</option>" +
          "<option value='annulee'>Annulee</option></select>")
      }
      else{
        if(span.text() === 'Nouvelle'){
          this.input1 = $("<select class='form-select' style='border-color: var(--vert);\n" +
            "border: solid 1px var(--vert); box-shadow: 0 0 0 0.1rem var(--vert); outline: none;'>" +
            "<option value='en attente'>En attente</option>" +
            "<option value='rejetee'>Rejetee</option>")
        }
        else{
          if(span.text() === 'Validee'){
            this.input1 = $("<select class='form-select' style='border-color: var(--vert);\n" +
              "border: solid 1px var(--vert); box-shadow: 0 0 0 0.1rem var(--vert); outline: none;'>" +
              "<option value='traitee'>Traitee</option>")
          }
        }
      }
      let label = $("<label class='text-wrap mt-2 fw-bold'>Sujet</label>")
      let text = $("<textarea class='text-wrap mt-2' style='background: #ECECEC;\n" +
        "  box-shadow: 0 0 0 0.1rem var(--vert);\n" +
        "  border-radius: 5px;\n" +
        "  border: solid 1px var(--vert); width: 100%'></textarea>")
      this.input1.appendTo($(`#statut${id}`));
      label.appendTo($(`#statut${id}`));
      text.appendTo($(`#statut${id}`));
      $(`#${id}`).off('click')
        .removeClass('fa-pencil-alt').addClass(`fa-check fa-check${id}`)
      $(`.fa-check${id}`).removeAttr('id')
      $(`.fa-check${id}`).css("color", "green")
        .parent().addClass(`btn${id}`).off('click')
      $(`.btn${id}`).on('click', () => {
        let obj = {
          statut : this.input1.val(),
          text: text.val()
        }
        this.demandeservice.updateStatutDemande(id, obj).subscribe((data: any)=>{
          if(data){
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
            if(data?.statut !== 'En attente'){
              if(data?.statut === 'Validee'){
                $(`.fa-check${id}`).removeClass('fa-check').addClass('fa-file-excel')
                $(`.fa-check${id}`).css("color", "green")
                $(`.fa-check${id}`).off('click')
              }
              else{
                $(`.fa-check${id}`).remove()
                $(`.btn${id}`).remove()
                $(`.fa-check${id}`).off('click')
              }
            }
            else {
              $(`.fa-check${id}`).removeClass('fa-check').addClass('fa-pencil-alt')
              $(`.fa-check${id}`).css("color", "#FFA000")
              $(`.fa-check${id}`).off('click')
            }
          }
        })
      })
    }
  }
}
