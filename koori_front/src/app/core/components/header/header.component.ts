import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {ActivatedRoute, Router } from '@angular/router';
import { SignupComponent } from 'src/app/users/components/signup/signup.component';

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
              private dialog: MatDialog) {
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

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(SignupComponent, dialogConfig);
  }



}

