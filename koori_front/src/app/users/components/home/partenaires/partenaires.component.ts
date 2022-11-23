import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.css']
})
export class PartenairesComponent implements OnInit {

  partenairesImg = [
    "assets/img/orange.png",
    "assets/img/sonatel.png",
    "assets/img/ilab.png",
    "assets/img/oss.jpeg",
    "assets/img/SA.jpeg",
    "assets/img/mect.png"
  ]
  partenaires = [
    "Orange",
    "Sonatel",
    "Innovation Lab",
    "Orange Startup Studio",
    "Sonatel Academy",
    "Ministère de l'éconmie numérique"
  ]
  constructor() { }

  ngOnInit(): void {
    Aos.init({
        duration: 800,
    })
  }

}
