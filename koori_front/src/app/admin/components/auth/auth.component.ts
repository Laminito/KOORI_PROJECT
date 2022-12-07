import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.f()
  }
  f(){
  $('#sign-up-btn').on( 'click',() => {
    $('.container').addClass('sign-up-mode')
  });

    $('#sign-in-btn').on('click', () => {
      $('.container').removeClass('sign-up-mode');
  });
  }

}
