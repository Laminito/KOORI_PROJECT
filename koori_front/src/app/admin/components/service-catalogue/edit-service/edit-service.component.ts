import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ServiceService } from 'src/app/admin/_services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {

  submitted = false;
  avatar!: File;
  id:any
  loading = false;

  constructor(private formBuilder: FormBuilder,
     private service: ServiceService,
     private route: ActivatedRoute) { }

  ngOnInit( ): void { 
    this.id = this.route.snapshot.params['id'];

      this.service.getServiceById(this.id)
          .pipe(first())
          .subscribe(x => this.addServiceform.patchValue(x));

  }
  addServiceform = this.formBuilder.group({
    libelle: ['service Test1', [Validators.required]],
    nom_des_clients: ['Toutes les directions de la sonatel', [Validators.required]],
    type_de_service: ['standard- Transversal', [Validators.required]],
    description: ['teste Description 1', [Validators.required]],
    description_elements_service: ['test description_elements_service 1', [Validators.required]],
    benefices_client: ['test benefices_client 1', [Validators.required]],
    indicateur_mesure_qualite: ['teste indicateur_mesure_qualite 1', [Validators.required]],
    engagement_niveaux_service: ['test engagement_niveaux_service 1', [Validators.required]],
    plage_horaire: ['test plage_horaire 1', [Validators.required]],
    livrables: ['teste livrables 1', [Validators.required]],
    suivi_gestion_relation_client: ['teste suivi_gestion_relation_client 1', [Validators.required]],
    liste_des_applications_metiers_supporte: ['teste liste_des_applications_metiers_supporte 1', [Validators.required]],
    tarifs_et_Facturation: ['teste tarifs_et_Facturation 1', [Validators.required]],
    file: ['assets/bootcamp.png', [Validators.required]],
  });
  onSubmit() {
    this.submitted = true;
    //his.loading = true;

      const formData = new FormData();
      formData.append('libelle', this.addServiceform.get('libelle')?.value!);
      formData.append('description', this.addServiceform.get('description')?.value!);
      formData.append('nom_des_clients', this.addServiceform.get('nom_des_clients')?.value!);
      formData.append('type_de_service', this.addServiceform.get('type_de_service')?.value!);
      formData.append('description_elements_service', this.addServiceform.get('description_elements_service')?.value!);
      formData.append('benefices_client', this.addServiceform.get('benefices_client')?.value!);
      formData.append('indicateur_mesure_qualite', this.addServiceform.get('indicateur_mesure_qualite')?.value!);
      formData.append('engagement_niveaux_service', this.addServiceform.get('engagement_niveaux_service')?.value!);
      formData.append('plage_horaire', this.addServiceform.get('plage_horaire')?.value!);
      formData.append('livrables', this.addServiceform.get('livrables')?.value!);
      formData.append('suivi_gestion_relation_client', this.addServiceform.get('suivi_gestion_relation_client')?.value!);
      formData.append('liste_des_applications_metiers_supporte', this.addServiceform.get('liste_des_applications_metiers_supporte')?.value!);
      formData.append('tarifs_et_Facturation', this.addServiceform.get('tarifs_et_Facturation')?.value!);
      formData.append('file', this.avatar);

   this.service.updateService(formData, this.id).pipe(first())
      .subscribe((data:any)=>{
        if(data){
                    Swal.fire({
                     icon: 'success',
                     title: 'SERVICE ENREGISTRÉ AVEC SUCCÉS !',
                     showConfirmButton: false,
                     timer: 3000
                   })
                  }
        },
        error => {
                  console.log(error.error);
                  //this.loading = false;
        });
  }

  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      this.avatar = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}


