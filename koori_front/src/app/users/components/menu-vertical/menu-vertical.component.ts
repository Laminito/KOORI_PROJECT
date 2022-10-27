import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { SenddataService } from '../../_services/senddata.service';
@Component({
  selector: 'app-menu-vertical',
  templateUrl: './menu-vertical.component.html',
  styleUrls: ['./menu-vertical.component.css']
})
export class MenuVerticalComponent implements OnInit {
   constructor(private sendData: SenddataService) {}

  ngOnInit(): void {

   $(function () {


     var fullHeight = function () {

       $('.js-fullheight').css('height', $(window).height);
       $(window).on('resize',function () {
         $('.js-fullheight').css('height', $(window).height);
       });

     };
     fullHeight();

     $('#sidebarCollapse').on('click', function () {
       $('#sidebar').toggleClass('active');
     });


   })
  }

  getValue(event:any) {
     if (event.target.classList.contains('default')){
       this.sendData.sendData('')
     }else {
       this.sendData.sendData(event.target.textContent)
     }
  }
}

