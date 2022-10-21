import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $('.open-menu-btn').on('click', function(){
      if($('body').hasClass('closed-menu')){
        $('body').removeClass('closed-menu');
      }else  $('body').addClass('closed-menu');
    });
    
  }

}
