import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/users/_models/Service';
import * as Aos from 'aos';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-card-service',
  templateUrl: './card-service.component.html',
  styleUrls: ['./card-service.component.css']
})
export class CardServiceComponent implements OnInit {

  @Input() services!: Service[]

  services$!: Observable<Service[]>

  images = [
    "assets/img/imgService_2.png",
    "assets/img/imgService_1.png",
    "assets/img/imgService_3.png",
    "assets/img/imgService_4.png",
    "assets/img/imgService_5.png",
  ]
 
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // for animations
    Aos.init({
      duration: 800,
    });

    this.services$ = this.route.data.pipe(
      map(data => data['services'])
    );
    
  }

  onGetService(id: number){
    this.router.navigateByUrl('/home/service/'+id);
  }

}
