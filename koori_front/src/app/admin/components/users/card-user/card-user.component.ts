import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../_models/user';

@Component({
  selector: '[app-card-user]',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent implements OnInit {

  @Input() user!: User

  constructor() { }

  ngOnInit(): void {
  }

}
