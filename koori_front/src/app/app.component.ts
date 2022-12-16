import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './users/_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  title = 'koori_front';

  constructor(private authService: AuthService){
  }

  ngOnInit(): void { }



}
