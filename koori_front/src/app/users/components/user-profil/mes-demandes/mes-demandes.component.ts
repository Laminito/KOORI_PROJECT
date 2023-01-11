import { Component, OnInit } from '@angular/core';
import { Demande } from 'src/app/users/_models/demande';
import { Service } from 'src/app/users/_models/Service';
import { User } from 'src/app/users/_models/user';
import { AuthService } from 'src/app/users/_services/auth.service';
import { CatalogueServiceService } from 'src/app/users/_services/catalogue-service.service';
import { DemandeService } from 'src/app/users/_services/demande.service';
import { forEachChild } from 'typescript';

@Component({
  selector: 'app-mes-demandes',
  templateUrl: './mes-demandes.component.html',
  styleUrls: ['./mes-demandes.component.css']
})
export class MesDemandesComponent implements OnInit {

  demandes!: Demande[]
  services: String[] = []
  user!: User | null

  constructor(private demandeService: DemandeService,
              private catalogueServiceService: CatalogueServiceService,
              private auth: AuthService) { }

  ngOnInit(): void {

    this.auth.userValue.subscribe(
      (userConnected) => this.user = userConnected
    )

    this.demandeService.getAllDemande().subscribe( //NE PAS OUBLIER DE PRENDRE LA METHODE GETDEMANDESBYUSERID
      data => {
        this.demandes = data.filter((dmd: any) => dmd.UserId == this.user?.id)
        for (let demande of data){
          this.catalogueServiceService.getByIdService(demande.Service.id).subscribe(
            service => {
              this.services.push(service.libelle)
            }
          )
        }
      }
    )
  }

}
