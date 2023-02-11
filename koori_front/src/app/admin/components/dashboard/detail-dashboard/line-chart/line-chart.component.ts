import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Demande } from 'src/app/admin/_models/demande';
import { DemandeService } from 'src/app/admin/_services/demande.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent implements OnInit {

  demandes: Demande[] = []
  idService!: Number
  constructor(private demandeService: DemandeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idService = +this.route.snapshot.params['id'];
    this.demandeService.getDemandesByServiceId(this.idService).subscribe(
      
    )
  }


}
