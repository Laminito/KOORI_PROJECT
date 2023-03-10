import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-kooriibox-menu',
  templateUrl: './kooriibox-menu.component.html',
  styleUrls: ['./kooriibox-menu.component.css']
})
export class KooriiboxMenuComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    
  }

}
