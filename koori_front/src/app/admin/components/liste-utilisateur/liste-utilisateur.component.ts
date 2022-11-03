import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import {Router} from "@angular/router";
import { Profil } from '../../_models/profil';
import { User } from '../../_models/user';
import { AllRequestService } from '../../_services/all-request.service';
import { SenddataService } from '../../_services/senddata.service';
import { UserService } from '../../_services/user.service';


@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrls: ['./liste-utilisateur.component.scss']
})
export class ListeUtilisateurComponent implements OnInit {
  
  titre: string = ""
  profils: Profil[] = []
  tab :[{ valeur: number; cle?: number }] =[{valeur: 0, cle: 0}]
  users: User[] = []
  p=1
  selectedDevice ?: number = 0;
  constructor(private allRequest: AllRequestService,
              private userservice: UserService,
              private senddata: SenddataService,
              private  _route: Router) {
    this.titre = 'Utilisateur';
  }

  ngOnInit(): void {
    this.getProfils()
    this.allRequest.getAll("user/").subscribe((data:any)=>{
      this.users = data
      while(this.tab.length > 0) {
        this.tab.pop();
      }
      for(let u of this.users){
        this.userservice.getDemandesByUserId(u.id).subscribe((data1)=>{
          this.tab.push({valeur: data1.length, cle: u.id})
        })
      }
    })
  }
  getProfils(){
    this.allRequest.getAll("profil/").subscribe((data:any)=>{
      this.profils = data
    })
  }
  onChange(newValue: number) {
    this.selectedDevice = newValue;
    if(this.selectedDevice ===0){
      this.allRequest.getAll("user/").subscribe((data:any)=>{
        this.users = data
        while(this.tab.length > 0) {
          this.tab.pop();
        }
        for(let u of this.users){
          this.userservice.getDemandesByUserId(u.id).subscribe((data1)=>{
            this.tab.push({valeur: data1.length, cle: u.id})
          })
        }
      })
    }
    else{
      this.userservice.getUserByProfil(this.selectedDevice).subscribe((data:any)=>{
        this.users = data
        while(this.tab.length > 0) {
          this.tab.pop();
        }
        for(let u of this.users){
          this.userservice.getDemandesByUserId(u.id).subscribe((data1)=>{
            this.tab.push({valeur: data1.length, cle: u.id})
          })
        }
      })
    }
  }
  navigate(id: number){
    this.senddata.setId(id)
    // @ts-ignore
    this._route.navigate([`/admin/utilisateur-detail/${id}`], id)
  }
}
