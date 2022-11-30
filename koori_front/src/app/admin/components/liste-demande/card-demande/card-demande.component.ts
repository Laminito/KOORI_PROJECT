import { Component, Input, OnInit } from '@angular/core';
import { Demande } from 'src/app/admin/_models/demande';
import { User } from 'src/app/admin/_models/user';
import { UserService } from 'src/app/admin/_services/user.service';

@Component({
  selector: 'app-card-demande',
  templateUrl: './card-demande.component.html',
  styleUrls: ['./card-demande.component.css']
})
export class CardDemandeComponent implements OnInit {
  @Input() demande!:Demande
  user!:User
  colors:string[] = ['#344DA8','#258F49','#256F49','#CA8654','#FF7713','#FF0000'] 
  statuts:string[]= [  'Nouvelle', 'Traitee', 'Validee','Rejetee','En attente', 'Annulee']
  input1!:any
  isClicked!:Boolean;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserById(this.demande.UserId).subscribe(
      data => this.user = data
    )
  }

}
