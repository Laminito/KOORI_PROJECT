import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { interval, map, Observable, take } from 'rxjs';
import { Demande } from 'src/app/admin/_models/demande';
import { DemandeService } from 'src/app/admin/_services/demande.service';

@Component({
  selector: 'app-demande-annuel-chart',
  templateUrl: './demande-annuel-chart.component.html',
  styleUrls: ['./demande-annuel-chart.component.css']
})
export class DemandeAnnuelChartComponent implements OnInit {

  constructor(private demandeService: DemandeService) { }

  annees!: Observable<number>
  demandesByService!:Observable<Demande[]>

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

  
  ReturnYears(demandes: Demande[]):number[]{
    var years:number[] = []
    for(let demande of demandes){
      years.push(Number(demande.createdAt.split('-')[0]))
    }
    return years
  }

  

  ngOnInit(): void {
    this.demandesByService = this.demandeService.getDemandesByServiceId(1)
    this.demandeService.getDemandesByServiceId(1).pipe(
      map(demande => this.ReturnYears(demande))
    ).subscribe(data => console.log(data)
    )

    }
}
