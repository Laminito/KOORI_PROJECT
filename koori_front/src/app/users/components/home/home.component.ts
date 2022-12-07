import {Component, OnInit} from '@angular/core';
import * as Aos from 'aos';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

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
  }

  slideToggle(ref:any) {
    let target = $(ref).attr('data-target');
    $('.'+target).slideToggle('slow');
  }

}
