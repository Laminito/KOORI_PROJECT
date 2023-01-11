import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.css']
})
export class PartenairesComponent implements OnInit {

  parteners = [
    {
      nom: "Orange",
      image: "assets/img/orange.png"
    },
    {
      nom: "Sonatel",
      image: "assets/img/sonatel.png"
    },
    {
      nom: "Innovation Lab",
      image: "assets/img/ilab.png"
    },
    {
      nom: "Orange Startup Studio",
      image: "assets/img/oss.jpeg"
    },
    {
      nom: "Sonatel Academy",
      image: "assets/img/SA.jpeg"
    },
    {
      nom: "Mect",
      image: "assets/img/mect.png"
    },
    
  ]

  constructor() { }

  ngOnInit(): void {
    Aos.init({
        duration: 800,
    })
  }

}
