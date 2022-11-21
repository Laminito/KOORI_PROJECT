import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {formatDate} from "@angular/common";
import * as $ from "jquery";
import { ChartConfiguration, ChartDataset, ChartOptions } from 'chart.js';
import { Service } from 'src/app/admin/_models/service';
import { Demande } from 'src/app/admin/_models/demande';
import { AllRequestService } from 'src/app/admin/_services/all-request.service';
import { User } from 'src/app/admin/_models/user';
import { data } from 'jquery';
declare var _:any;

@Component({
  selector: 'app-detail-dashboard',
  templateUrl: './detail-dashboard.component.html',
  styleUrls: ['./detail-dashboard.component.scss']
})
export class DetailDashboardComponent implements OnInit {

  service: Service = new Service()
  month: [] = []
  selectedDevice1 : number = 0;
  selectedDevice2 : number = 0;
  selectedDevice3 : number = 0;
  Demfiltre: Demande[] = []
  newyear: string
  newday: string
  newmonth: string
  newmonthchif: string
  tab0: string[] = []
  tab1: string[][] = []
  statut: string[] = []
  currentDate: Date
  Jour = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
  Mois = [{c:1,l:'Janvier'},{c:2,l:'Fevrier'},{c:3,l:'Mars'},{c:4,l:'Avril'},{c:5,l:'Mai'},{c:6,l:'Juin'},{c:7,l:'Juillet'},{c:8,l:'Aout'},{c:9,l:'Septembre'},{c:10,l:'Octobre'},{c:11,l:'Novembre'},{c:12,l:'Decembre'}]
  Annee : number[] = []
  allYear: string[] = []
  DemYear: [{demandes: Demande[]; annee?: string;}] =[{demandes: [], annee: ''}]
  valYear: [{valeur: number; annee?: string;}] =[{valeur: 0, annee: ''}]
  statuts: [{allstatut: (string | undefined)[]; annee?: string;}] =[{allstatut: [], annee: ''}]
  statutsYear: [{allstatutcount: [{valeur: number; cle?: string;}]; annee?: string;}] =[{allstatutcount: [{valeur: 0, cle: ''}], annee: ''}]
  couleur = {'#344DA8' : 'nouvelle', '#258F49': 'traitee', '#256F49': 'validee', '#CA8654': 'rejetee', '#FF7713': 'en attente', '#FF0000': 'annulee'}
  color: string[] = []
  users: User[] = []
  STATUT = ['Nouvelle', 'En attente', 'Rejetee', 'Validee', 'Annulee', 'Traitee']
  tabDem :[{ valeur: number; cle?: string; pourc: number}] =[{valeur: 0, cle: '', pourc: 0}]

  select0: string | undefined | string[] | number
  select1: string | undefined | string[] | number
  select2: string | undefined | string[] | number

  lineChartDatas: ChartConfiguration['data'] = 
    { 
      datasets: [
        {
          data: [],
          label: '',
          backgroundColor: 'rgba(255,0,0,0.3)',
          fill: 'origin'
        }
      ], 
      labels: [] 
    }

  lineChartData: ChartConfiguration['data'] = 
    { 
      datasets: [], 
      labels: [] 
    }
  
  lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    responsive: true, 
    scales: {
      y:{
          display: true,
        },
      x:{
          
          display: true
          
        },
    },
    
  };

  lineChartLegend = true;
  plugins = [];


  pieChartOptions: ChartConfiguration['options'] = 
  {
    responsive: true, 
    plugins: {
      legend: 
      { 
        display: true,
        position: "right" 
      }
    }
  };
  pieChartLabels: string[] = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
  moisInt: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
 
  pieChartDatas= {
    datasets: [
      {
        data: [0,0,0,0,0,0,0,0,0,0,0,0],
        fill: 'origin'
      }
    ],
    labels: this.pieChartLabels
  };
  pieChartLegend = true;
  pieChartPlugins = [];


  constructor(private route: ActivatedRoute,
              private allRequest: AllRequestService) {
    this.currentDate = new Date()
    this.newyear = formatDate(this.currentDate, 'Y', 'en-US')
    this.newday = formatDate(this.currentDate, 'dd', 'en-US')
    this.newmonth = formatDate(this.currentDate, 'MMM', 'en-US')
    this.newmonthchif = formatDate(this.currentDate, 'M', 'en-US')
    let init = 2019;

    for(let i=0; i<parseInt(this.newyear) - init + 1; i++){
      this.Annee.push(parseInt(this.newyear)-i);
    }

    this.route.data.subscribe((data) => {
      this.service = data['detailService'];
      this.lineChartDatas.datasets[0].label = this.service.libelle
      let d = formatDate(this.currentDate, 'dd', 'en-US')
      let m = formatDate(this.currentDate, 'M', 'en-US')
      let y = formatDate(this.currentDate, 'Y', 'en-US')
      this.tab0.push(d, m, y)
      while(this.statut.length > 0) {
        this.statut.pop();
      }

      let tabDemVal :[{ valeur: number; cle?: string; pourc: number}] =[{valeur: 0, cle: '', pourc: 0}]
      while(this.tabDem.length > 0) {
        this.tabDem.pop();
      }
      
      if(this.service.Demandes){
        for(let dem of this.service.Demandes){
          // @ts-ignore
          let d = formatDate(dem.date_realisation, 'dd', 'en-US')
          // @ts-ignore
          let m = formatDate(dem.date_realisation, 'M', 'en-US')
          // @ts-ignore
          let y = formatDate(dem.date_realisation, 'Y', 'en-US')
          let t= []
          t.push(d, m, y)
          this.tab1.push(t)
        }
        for(let dy of this.service.Demandes){
          if (dy.statut != null && !this.statut.includes(dy.statut)) {
            this.statut.push(dy.statut)
          }
        }
        if(this.service.Demandes?.length !==0){
          if(this.service.Demandes?.length === this.statut.length){
              for (let st of this.statut){
              let a: number = 0
                for(let dy of this.service.Demandes){
                if (st === dy.statut){
                  a +=1
                }
              }
              let p = a*(100/this.service.Demandes.length)
              tabDemVal.push({valeur: a, cle: st, pourc: Math.round(p*100)/100})
            }
          }
          else{
            for(let st of this.statut){
              let a: number = 0
              for (let dy of this.service.Demandes){
                if (st === dy.statut){
                  a +=1
                }
              }
              let p = a*(100/this.service.Demandes.length)
              tabDemVal.push({valeur: a, cle: st, pourc: Math.round(p*100)/100})
            }
          }
        }
        for(let s of this.STATUT){
          for(let i=0;i<this.statut.length; i++){
            if(s === this.statut[i]){
              this.tabDem.push(tabDemVal[i])
            }
          }
          if (!this.statut.includes(s)){
            let obj : { valeur: number; cle?: string; pourc: number} = {valeur: 0, cle: '', pourc: 0}
            obj.cle = s
            this.tabDem.push(obj)
          }
        }
        for(let dy of this.STATUT){
          const key = _.findKey(this.couleur, function (v: string) {
            return v === dy?.toLowerCase();
          });
          if(!this.color.includes(key)){
            this.color.push(key)
          }
        }
      }
      this.getAllDemOfYear()
      this.getClients()
    });
  }

  ngOnInit(): void {}
  onChange1(newValue: number) {
    this.selectedDevice1 = newValue
    if($(`#select0`).val()?.toString().includes(':')){
      this.select0 = $(`#select0`).val()?.toString().split(':')[0]
    }
    else{
      this.select0 = $(`#select0`).val()
    }
    if($(`#select1`).val()?.toString().includes(':')){
      this.select1 = $(`#select1`).val()?.toString().split(':')[0]
    }
    else{
      this.select1 = $(`#select1`).val()
    }
    if($(`#select2`).val()?.toString().includes(':')){
      this.select2 = $(`#select2`).val()?.toString().split(':')[0]
    }
    else{
      this.select2 = $(`#select2`).val()
    }
    while(this.Demfiltre.length > 0) {
      this.Demfiltre.pop();
    }
    for(let j=0;j<this.tab1.length;j++){
      //jour
      if(this.select0?.toString().trim() &&
        this.select1?.toString().trim() == '0' &&
        this.select2?.toString().trim() == '0'){
        if(this.tab1[j][0].trim() === this.select0?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //mois
      if(this.select0?.toString().trim() == '0' &&
        this.select1?.toString().trim() &&
        this.select2?.toString().trim() == '0'){
        if(this.tab1[j][1] === this.select1?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //annee
      if(this.select0?.toString().trim() == '0'  &&
        this.select1?.toString().trim() == '0' &&
        this.select2?.toString().trim()){
        if(this.tab1[j][2] === this.select2?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //jour mois
      if(this.select0?.toString().trim() &&
        this.select1?.toString().trim() &&
        this.select2?.toString().trim() == '0'){
        if(this.tab1[j][0] === this.select0?.toString().trim() &&
          this.tab1[j][1] === this.select1?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //jour annee
      if(this.select0?.toString().trim() &&
        this.select1?.toString().trim() == '0' &&
        this.select2?.toString().trim()){
        if(this.tab1[j][0] === this.select0?.toString().trim() &&
          this.tab1[j][2] === this.select2?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //mois annee
      if(this.select0?.toString().trim() == '0' &&
        this.select1?.toString().trim() &&
        this.select2?.toString().trim()){
        if(this.tab1[j][1] === this.select1?.toString().trim() &&
          this.tab1[j][2] === this.select2?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //jour mois annee
      if(this.select0?.toString().trim() &&
        this.select1?.toString().trim() &&
        this.select2?.toString().trim()){
        if(this.tab1[j][0] === this.select0?.toString().trim() &&
          this.tab1[j][1] === this.select1?.toString().trim() &&
          this.tab1[j][2] === this.select2?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
    }
    while(this.tabDem.length > 0) {
      this.tabDem.pop();
    }
    while(this.statut.length > 0) {
      this.statut.pop();
    }
    while(this.color.length > 0) {
      this.color.pop();
    }
    for(let dy of this.Demfiltre){
      if (dy.statut != null && !this.statut.includes(dy.statut)) {
        this.statut.push(dy.statut)
      }
      const key = _.findKey(this.couleur, function (v: string) {
        return v === dy?.statut?.toLowerCase();
      });
      if(!this.color.includes(key)){
        this.color.push(key)
      }
    }
    if(this.Demfiltre.length !==0){
      if(this.Demfiltre.length === this.statut.length){
        for(let dy of this.Demfiltre){
          let a: number = 0
          for (let st of this.statut){
            if (st === dy.statut){
              a +=1
            }
          }
          this.tabDem.push({valeur: a, cle: dy.statut, pourc: Math.round((a*(100/this.tab1.length))*100)/100})
        }
      }
      else{
        for(let st of this.statut){
          let a: number = 0
          for (let dy of this.Demfiltre){
            if (st === dy.statut){
              a +=1
            }
          }
          this.tabDem.push({valeur: a, cle: st, pourc: Math.round((a*(100/this.tab1.length))*100)/100})
        }
      }
    }
  }
  
  onChange2(newValue: number) {
    this.selectedDevice2 = newValue
    if($(`#select0`).val()?.toString().includes(':')){
      this.select0 = $(`#select0`).val()?.toString().split(':')[0]
    }
    else{
      this.select0 = $(`#select0`).val()
    }
    if($(`#select1`).val()?.toString().includes(':')){
      this.select1 = $(`#select1`).val()?.toString().split(':')[0]
    }
    else{
      this.select1 = $(`#select1`).val()
    }
    if($(`#select2`).val()?.toString().includes(':')){
      this.select2 = $(`#select2`).val()?.toString().split(':')[0]
    }
    else{
      this.select2 = $(`#select2`).val()
    }
    while(this.Demfiltre.length > 0) {
      this.Demfiltre.pop();
    }
    for(let j=0;j<this.tab1.length;j++){
      //jour
      if(this.select0?.toString().trim() &&
        this.select1?.toString().trim() == '0' &&
        this.select2?.toString().trim() == '0'){
        if(this.tab1[j][0].trim() === this.select0?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //mois
      if(this.select0?.toString().trim() == '0' &&
        this.select1?.toString().trim() &&
        this.select2?.toString().trim() == '0'){
        if(this.tab1[j][1] === this.select1?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //annee
      if(this.select0?.toString().trim() == '0'  &&
        this.select1?.toString().trim() == '0' &&
        this.select2?.toString().trim()){
        if(this.tab1[j][2] === this.select2?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //jour mois
      if(this.select0?.toString().trim() &&
        this.select1?.toString().trim() &&
        this.select2?.toString().trim() == '0'){
        if(this.tab1[j][0] === this.select0?.toString().trim() &&
          this.tab1[j][1] === this.select1?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //jour annee
      if(this.select0?.toString().trim() &&
        this.select1?.toString().trim() == '0' &&
        this.select2?.toString().trim()){
        if(this.tab1[j][0] === this.select0?.toString().trim() &&
          this.tab1[j][2] === this.select2?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //mois annee
      if(this.select0?.toString().trim() == '0' &&
        this.select1?.toString().trim() &&
        this.select2?.toString().trim()){
        if(this.tab1[j][1] === this.select1?.toString().trim() &&
          this.tab1[j][2] === this.select2?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //jour mois annee
      if(this.select0?.toString().trim() &&
        this.select1?.toString().trim() &&
        this.select2?.toString().trim()){
        if(this.tab1[j][0] === this.select0?.toString().trim() &&
          this.tab1[j][1] === this.select1?.toString().trim() &&
          this.tab1[j][2] === this.select2?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
    }
    while(this.tabDem.length > 0) {
      this.tabDem.pop();
    }
    while(this.statut.length > 0) {
      this.statut.pop();
    }
    while(this.color.length > 0) {
      this.color.pop();
    }
    for(let dy of this.Demfiltre){
      if (dy.statut != null && !this.statut.includes(dy.statut)) {
        this.statut.push(dy.statut)
      }
      const key = _.findKey(this.couleur, function (v: string) {
        return v === dy?.statut?.toLowerCase();
      });
      if(!this.color.includes(key)){
        this.color.push(key)
      }
    }
    if(this.Demfiltre.length !==0){
      if(this.Demfiltre.length === this.statut.length){
        for(let dy of this.Demfiltre){
          let a: number = 0
          for (let st of this.statut){
            if (st === dy.statut){
              a +=1
            }
          }
          this.tabDem.push({valeur: a, cle: dy.statut, pourc: Math.round((a*(100/this.tab1.length))*100)/100})
        }
      }
      else{
        for(let st of this.statut){
          let a: number = 0
          for (let dy of this.Demfiltre){
            if (st === dy.statut){
              a +=1
            }
          }
          this.tabDem.push({valeur: a, cle: st, pourc: Math.round((a*(100/this.tab1.length))*100)/100})
        }
      }
    }
  }

  onChange3(newValue: number) {
    this.selectedDevice3 = newValue
    if($(`#select0`).val()?.toString().includes(':')){
      this.select0 = $(`#select0`).val()?.toString().split(':')[0]
    }
    else{
      this.select0 = $(`#select0`).val()
    }
    if($(`#select1`).val()?.toString().includes(':')){
      this.select1 = $(`#select1`).val()?.toString().split(':')[0]
    }
    else{
      this.select1 = $(`#select1`).val()
    }
    if($(`#select2`).val()?.toString().includes(':')){
      this.select2 = $(`#select2`).val()?.toString().split(':')[0]
    }
    else{
      this.select2 = $(`#select2`).val()
    }
    while(this.Demfiltre.length > 0) {
      this.Demfiltre.pop();
    }
    for(let j=0;j<this.tab1.length;j++){
      //jour
      if(this.select0?.toString().trim() &&
        this.select1?.toString().trim() == '0' &&
        this.select2?.toString().trim() == '0'){
        if(this.tab1[j][0].trim() === this.select0?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //mois
      if(this.select0?.toString().trim() == '0' &&
        this.select1?.toString().trim() &&
        this.select2?.toString().trim() == '0'){
        if(this.tab1[j][1] === this.select1?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //annee
      if(this.select0?.toString().trim() == '0'  &&
        this.select1?.toString().trim() == '0' &&
        this.select2?.toString().trim()){
        if(this.tab1[j][2] === this.select2?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //jour mois
      if(this.select0?.toString().trim() &&
        this.select1?.toString().trim() &&
        this.select2?.toString().trim() == '0'){
        if(this.tab1[j][0] === this.select0?.toString().trim() &&
          this.tab1[j][1] === this.select1?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //jour annee
      if(this.select0?.toString().trim() &&
        this.select1?.toString().trim() == '0' &&
        this.select2?.toString().trim()){
        if(this.tab1[j][0] === this.select0?.toString().trim() &&
          this.tab1[j][2] === this.select2?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //mois annee
      if(this.select0?.toString().trim() == '0' &&
        this.select1?.toString().trim() &&
        this.select2?.toString().trim()){
        if(this.tab1[j][1] === this.select1?.toString().trim() &&
          this.tab1[j][2] === this.select2?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
      //jour mois annee
      if(this.select0?.toString().trim() &&
        this.select1?.toString().trim() &&
        this.select2?.toString().trim()){
        if(this.tab1[j][0] === this.select0?.toString().trim() &&
          this.tab1[j][1] === this.select1?.toString().trim() &&
          this.tab1[j][2] === this.select2?.toString().trim()){
          // @ts-ignore
          this.Demfiltre.push(this.service?.Demandes[j])
        }
      }
    }
    while(this.tabDem.length > 0) {
      this.tabDem.pop();
    }
    while(this.statut.length > 0) {
      this.statut.pop();
    }
    while(this.color.length > 0) {
      this.color.pop();
    }
    for(let dy of this.Demfiltre){
      if (dy.statut != null && !this.statut.includes(dy.statut)) {
        this.statut.push(dy.statut)
      }
      const key = _.findKey(this.couleur, function (v: string) {
        return v === dy?.statut?.toLowerCase();
      });
      if(!this.color.includes(key)){
        this.color.push(key)
      }
    }
    if(this.Demfiltre.length !==0){
      if(this.Demfiltre.length === this.statut.length){
        for(let dy of this.Demfiltre){
          let a: number = 0
          for (let st of this.statut){
            if (st === dy.statut){
              a +=1
            }
          }
          this.tabDem.push({valeur: a, cle: dy.statut, pourc: Math.round((a*(100/this.tab1.length))*100)/100})
        }
      }
      else{
        for(let st of this.statut){
          let a: number = 0
          for (let dy of this.Demfiltre){
            if (st === dy.statut){
              a +=1
            }
          }
          this.tabDem.push({valeur: a, cle: st, pourc: Math.round((a*(100/this.tab1.length))*100)/100})
        }
      }
    }
  }

  getAllDemOfYear(){
    if(this.lineChartDatas.datasets[0].data && this.lineChartDatas.datasets[0].data.length !=0){
      while(this.lineChartDatas.datasets[0].data.length > 0) {
        this.lineChartDatas.datasets[0].data.pop();
      }
    }
    if(this.lineChartDatas.labels && this.lineChartDatas.labels.length !=0){
      while(this.lineChartDatas.labels.length > 0) {
        this.lineChartDatas.labels.pop();
      }
    }
    while(this.allYear.length > 0) {
      this.allYear.pop();
    }
    while(this.DemYear.length > 0) {
      this.DemYear.pop();
    }
    while(this.valYear.length > 0) {
      this.valYear.pop();
    }
    while(this.statutsYear.length > 0) {
      this.statutsYear.pop();
    }
    while(this.statuts.length > 0) {
      this.statuts.pop();
    }
    //all year
    if(this.service.Demandes){
      for(let dem of this.service.Demandes){
        // @ts-ignore
        let y = formatDate(dem.date_realisation, 'Y', 'en-US')
        if(!this.allYear.includes(y)){
          this.allYear.push(y)
        }
      }
    }
    // les demandes par annee
    for(let a=0;a<this.allYear.length;a++){
      let allDem: Demande[] =[]
      while(allDem.length > 0) {
        allDem.pop();
      }
      if(this.service.Demandes){
        for(let dem of this.service.Demandes){
          // @ts-ignore
          let ydem = formatDate(dem.date_realisation, 'Y', 'en-US')
          if(ydem === this.allYear[a]){
            allDem.push(dem)
          }
        }
        this.DemYear.push({demandes: allDem, annee: this.allYear[a]})
      }
    }
    // le nombre de demandes par annee
    for(let i of this.DemYear){
      this.valYear.push({valeur: i.demandes.length, annee: i.annee})
    }
    // les statuts de chaque demande de chaque annee
    for(let i =0;i<this.DemYear.length;i++){
      let t: (string | undefined)[] =[]
      for(let j=0;j<this.DemYear[i].demandes.length;j++){
        if (this.DemYear[i].demandes[j].statut != null && !t.includes(this.DemYear[i].demandes[j].statut)){
          t.push(this.DemYear[i].demandes[j].statut)
        }
      }
      this.statuts.push({allstatut: t, annee: this.DemYear[i].annee})
      if(this.DemYear[i].demandes.length !==0){
        if(this.DemYear[i].demandes.length === this.statuts[i].allstatut.length){
          let tcv: [{valeur: number; cle?: string;}] = [{valeur: 0, cle: ''}]
          while(tcv.length > 0) {
            tcv.pop();
          }
          for(let dy of this.DemYear[i].demandes){
            let a: number = 0
            for (let st of this.statuts[i].allstatut){
              if (st === dy.statut){
                a +=1
              }
            }
            tcv.push({valeur: a, cle: dy.statut})
          }
          this.statutsYear.push({allstatutcount: tcv, annee: this.DemYear[i].annee})
        }
        else{
          for(let j=0;j<this.statuts.length;j++){
            let tcv: [{valeur: number; cle?: string;}] = [{valeur: 0, cle: ''}]
            while(tcv.length > 0) {
              tcv.pop();
            }
            for (let st of this.statuts[j].allstatut){
              for (let dy of this.DemYear[i].demandes){
                let a: number = 0
                if (st === dy.statut){
                  a +=1
                }
                tcv.push({valeur: a, cle: st})
              }
            }
            this.statutsYear.push({allstatutcount: tcv, annee: this.DemYear[i].annee})
          }
        }
      }
    }
    //lineChartLabels
    let t = []
    for (let a of this.Annee){
      t.push(a.toString())
    }
    for(let i=1; i<=t.length; i++){
      if(this.lineChartDatas.labels){
        this.lineChartDatas.labels.push(t[t.length -i]);
      }
    }
    // nombre de demandes annuel du service
    for(let v of this.valYear){
      let t = []
      if(this.lineChartDatas.labels){
      for(let l of this.lineChartDatas.labels){
        if( typeof l === 'string' && this.allYear.includes(l)){
          t.push(v.valeur)
        }
        else{
          t.push(0)
        }
      }
    }
      this.lineChartDatas.datasets[0].data = t
    }
    // Nos realisations annuelles suivant le statut des demandes
    let tout:[{data: number[]; label?: string;}] =[{data: [], label: ''}]
    while(tout.length > 0) {
      tout.pop();
    }
    for(let st =0;st<5; st++){
      let x ={data: [], label: this.STATUT[st]}
      tout.push(x)
    }
    const itemInB = (item: string) => this.allYear.includes(item)
    const getItemArray = (item: any) => {
      // @ts-ignore
      let position = this.statutsYear.map((i) => i.annee).indexOf(item)
      return position > 0 ? this.statutsYear[position].allstatutcount : this.statutsYear[0].allstatutcount
    }
    const updateX = (itemArray: any,position: any) => {
      for(let i = 0; i<tout.length; i++){
        let label = tout[i]["label"]
        let posInArray = itemArray.map((obj: { cle: any; }) => obj.cle).indexOf(label)
        tout[i]["data"][position] = posInArray === -1 ? 0 : itemArray[posInArray]["valeur"]
      }
    }
    const setX = () => {
      if(this.lineChartDatas.labels){
      for(let i = 0; i< this.lineChartDatas.labels.length; i++){
        let item = this.lineChartDatas.labels[i];
        // @ts-ignore
        if(!itemInB(item)) {
          updateX([],i)
          continue;
        }
        let itemArray = getItemArray(item)
        updateX(itemArray,i)
      }
    }
      while(this.lineChartData.datasets.length > 0) {
        this.lineChartData.datasets.pop();
      }
      this.lineChartData.datasets = tout
    }
    setX()
  }

  getClients(){
    this.allRequest.getAll("client/").subscribe((data:any)=>{
      this.users = data
      let tabMois =[]
      for(let u of this.users){
        // @ts-ignore
        let m = formatDate(u['createdAt'], 'M', 'en-US')
        tabMois.push(parseInt(m))
      }
      let tabClient = []
      for(let i of this.moisInt){
        let a =0
        for (let m of tabMois){
          if(i === m){
            a +=1
          }
        }
        tabClient.push(a)
      }
      while(this.pieChartDatas.datasets.length > 0) {
        this.pieChartDatas.datasets.pop();
      }
      this.pieChartDatas.datasets[0].data = tabClient
    })
  }

}
