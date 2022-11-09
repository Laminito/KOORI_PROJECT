import { Component, Input, OnInit } from '@angular/core';
import { Service } from 'src/app/users/_models/Service';

@Component({
  selector: 'app-card-service',
  templateUrl: './card-service.component.html',
  styleUrls: ['./card-service.component.css']
})
export class CardServiceComponent implements OnInit {

  @Input() services!: Service[]

  images = [
    "assets/img/imgService_2.png",
    "assets/img/imgService_1.png",
    "assets/img/imgService_3.png",
    "assets/img/imgService_4.png",
    "assets/img/imgService_5.png",
  ]
  constructor() { }

  ngOnInit(): void {
  }

}