<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit  } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
>>>>>>> e83f12046cab025fe45318f87acd97704f3a3c6d

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
<<<<<<< HEAD

  constructor() { }

  ngOnInit(): void {
  }

}
=======
  menu = false
  defaultRoute: string = ""
  constructor(private  route: Router, private  actRoute: ActivatedRoute) {
  }

  ngOnInit(): void {}

  open(){
      // @ts-ignore
    this.defaultRoute = this.actRoute.snapshot['_routerState'].url
    if (this.defaultRoute === "/kooriibox"){
        this.menu = true;
    }
    $(document.getElementsByClassName('w-75')).hide()
  }
  
}

>>>>>>> e83f12046cab025fe45318f87acd97704f3a3c6d
