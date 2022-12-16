import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/users/_services/auth.service';

@Component({
  selector: 'app-for-user-connected',
  templateUrl: './for-user-connected.component.html',
  styleUrls: ['./for-user-connected.component.css']
})
export class ForUserConnectedComponent implements OnInit {

  isLoggedIn!:boolean;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn
  }

}
