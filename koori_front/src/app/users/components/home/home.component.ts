import {Component, OnInit} from '@angular/core';
import * as Aos from 'aos';
import { IboxService } from 'src/app/admin/_services/ibox.service';
import { Ibox } from '../../_models/ibox';
import { Koori } from '../../_models/koori';
import { Service } from '../../_models/Service';
import { Temoignage } from '../../_models/Temoignage';
import { AllRequestService } from '../../_services/all-request.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  temoignages!: Temoignage[]
  koori!: Koori;
  ibox!: Ibox;
  services!: Service[];

  constructor( private allRequest: AllRequestService, private iboxService: IboxService) { }

  ngOnInit(): void {

    Aos.init({
      duration: 800,
    })

    $(function($) {
      // js for carousel
      let items = document.querySelectorAll('.partner .carousel .carousel-item')
      items.forEach((el) => {
        const minPerSlide = 4
        let next = el.nextElementSibling
        for (let i=1; i<minPerSlide; i++) {
          if (!next) {
            next = items[0]
          }
          let cloneChild = next.cloneNode(true)
          el.appendChild(cloneChild.childNodes[0])
          next = next.nextElementSibling
        }
      })
      // js for our services cards
      $('.show').on('click',function(){
        let target = $(this).attr('data-target');
        $('.'+target).slideToggle('slow');
      });

      $('.close').on('click',function(){
        $(this).parent().slideToggle('slow');
      });

    });

    this.allRequest.getAllServices().subscribe(
      (data) => {
        console.log(data);
      }
      
    )

    this.getDescriptionKoori();
    this.getDescriptionIbox();
    this.getTemoignages();
  }

  getDescriptionKoori(){
    this.allRequest.getAll("koori/last","description").subscribe((data:any)=>{
      this.koori = new Koori().deserialize(data)
    })
  }
  
  getDescriptionIbox(){
    this.allRequest.getAll("ibox/last",).subscribe((data:any)=>{
      this.ibox = new Ibox().deserialize(data)
    })
  }


  getTemoignages() {
    this.allRequest.getAll("temoignage").subscribe((data: any) => {
      this.temoignages = data.map((temoignage: Temoignage) => new Temoignage().deserialize(temoignage));
    })
    
  }

  slideToggle(ref:any) {
    let target = $(ref).attr('data-target');
    $('.'+target).slideToggle('slow');
  }

}
