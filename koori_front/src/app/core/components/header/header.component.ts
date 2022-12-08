import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<boolean>();

  menu = false;

  defaultRoute: string = "";

  constructor(private route: Router, 
              private actRoute: ActivatedRoute,
              ) {
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

