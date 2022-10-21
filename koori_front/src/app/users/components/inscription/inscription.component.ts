import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  submitted = false;
  addForm!: FormGroup;
  avatar: any;
  url: any;
  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      ProfilId: [2, Validators.required],
      nomComplet: ['', Validators.required],
      /*password: ['', Validators.required],*/
      email: ['', Validators.required],
      profession: ['', Validators.required],
      service: ['', Validators.required],
      departement: ['', Validators.required],
      direction: ['', Validators.required],
      file: [null]
    });
  }
  get f() {
    // @ts-ignore
    return this.addForm.controls;
  }
  onSubmit(){
    console.log('ok')
    this.submitted = true;
    /*if(this.addForm.valid){}*/
    const {ProfilId, nomComplet, email, password, departement, service,
      profession, direction} = this.addForm.value;
    const fiche = new FormData();
    fiche.append('ProfilId', ProfilId);
    fiche.append('nomComplet', nomComplet);
    fiche.append('email', email);
    /*fiche.append('password', password);*/
    fiche.append('departement', departement);
    fiche.append('service', service);
    fiche.append('profession', profession);
    fiche.append('direction', direction);
    if(this.avatar){
      fiche.append('file', this.avatar);
    }
    console.log(this.addForm.value)
    this.userService.postUser(fiche).subscribe((data:any)=>{
      console.log(data)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Ajout effectue avec succès',
        showConfirmButton: false,
        timer: 3000
      })
    })
    /*this.submitted = false;
    this.addForm.reset()*/
  }
  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      this.avatar = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:no-shadowed-variable
      /*reader.onload = (event: any) => { // called once readAsDataURL is completed
        //this.url = event.target.result;
      };*/
    }
    /*var curElement = $(this).parent().parent().find('.image');
    console.log(curElement);
    var reader = new FileReader();
    this.avatar = event.target.files[0];
    reader.onload = function (e) {
      // @ts-ignore
      curElement.attr('src', e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => { // called once readAsDataURL is completed
      this.url = event.target.result;
    };*/
  }
}
