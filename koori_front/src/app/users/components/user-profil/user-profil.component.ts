import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  
    user!: User | null

    constructor(private userService: UserService,
                private authService: AuthService) { }

    ngOnInit(): void {
      this.authService.userValue.subscribe(
        (userConnected) => this.user = userConnected
      )
      var el = document.getElementById("wrapper");
      var toggleButton = document.getElementById("menu-toggle");
      // @ts-ignore
      toggleButton.onclick = function () {
        // @ts-ignore
        el.classList.toggle("toggled");
      };
    }
    
   
  
}
