import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(window).scroll(function() {
      // @ts-ignore
      if ($(this).scrollTop() >= 50) {
        $('#top').fadeIn("fast");
      } else {
        $('#top').fadeOut("fast");
      }
    });
    $('#top').click(function() {
      $('body,html').animate({
        scrollTop : 0
      }, 500);
    });
  }

}
