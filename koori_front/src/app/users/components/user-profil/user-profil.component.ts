import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
    user!:User
    constructor(private userService: UserService) { }

    ngOnInit(): void {
      this.userService.getUserById(1).subscribe(
        (data) => {
            console.log(data)
            this.user = data         
        }
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
