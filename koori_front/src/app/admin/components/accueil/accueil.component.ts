import { Component, OnInit } from '@angular/core';
import { Service } from '../../_models/service';
import { AllRequestService } from '../../_services/all-request.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  title= 'kooriAdmin'
  services: Service[]=[];

  constructor(private allRequest: AllRequestService) { }

  ngOnInit(): void {
    this.getService();

    var el = document.getElementById("wrapper");
    var toggleButton = document.getElementById("menu-toggle");
    // @ts-ignore
    toggleButton.onclick = function () {
      // @ts-ignore
      el.classList.toggle("toggled");
    };
      $(".sidebar-dropdown > a").on('click',function() {
        $(".sidebar-submenu").slideUp(200);
        if (
          $(this)
            .parent()
            .hasClass("active")
        ) {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .parent()
            .removeClass("active");
        } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .next(".sidebar-submenu")
            .slideDown(200);
          $(this)
            .parent()
            .addClass("active");
        }
      });

      $("#close-sidebar").on('click',function() {
        $(".page-wrapper").removeClass("toggled");
      });
      $("#show-sidebar").on('click',function() {
        $(".page-wrapper").addClass("toggled");
      });

  }
  getService(){
    this.allRequest.getAll('service/').subscribe((data:any)=>{
      this.services=data;
    })
  }

}
