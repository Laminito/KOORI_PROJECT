import { Component, OnInit } from '@angular/core';
import { Ibox } from 'src/app/users/_models/ibox';
import { Koori } from 'src/app/users/_models/koori';
import { AllRequestService } from 'src/app/users/_services/all-request.service';
import { AuthService } from 'src/app/users/_services/auth.service';

@Component({
  selector: 'app-koori-ibox',
  templateUrl: './koori-ibox.component.html',
  styleUrls: ['./koori-ibox.component.css']
})
export class KooriIboxComponent implements OnInit {

  koori!: Koori;
  ibox!: Ibox;
  isLoggedIn!: boolean
  constructor(private allRequest: AllRequestService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn
    this.getDescriptionKoori();
    this.getDescriptionIbox();
  }

  getDescriptionKoori(){
    this.allRequest.getAll("koori/last","description").subscribe((data:any)=>{
      this.koori = new Koori().deserialize(data)
    })
  }
  
  getDescriptionIbox(){
    this.allRequest.getAll("ibox/last",).subscribe((data:any)=>{
      this.ibox = new Ibox().deserialize(data)
    })
  }
}
