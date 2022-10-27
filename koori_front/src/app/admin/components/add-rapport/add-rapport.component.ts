import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import { Demande } from '../../_models/demande';
import { AllRequestService } from '../../_services/all-request.service';
import { SenddataService } from '../../_services/senddata.service';


@Component({
  selector: 'app-add-rapport',
  templateUrl: './add-rapport.component.html',
  styleUrls: ['./add-rapport.component.scss','../add-fiche/add-fiche.component.scss']
})
export class AddRapportComponent implements OnInit {
  @ViewChild('closebutton') closebutton:any;
  addForm!: FormGroup;
  submitted: boolean = false;
  file: any;
  usersSession:Demande = new Demande();
  notifiedUser:any=[]
  unNotifiedUser:any=[]

  constructor(private formBuilder: FormBuilder, private allRequest: AllRequestService, private getData: SenddataService) {
  }

  ngOnInit(): void {
    // init form
    this.addForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      ServiceId: ['', Validators.required],
      statut: ['visible', Validators.required],
      file: [null, Validators.required],
      participants: [[],Validators.required],
      idDemande:['',Validators.required]
    });

    // get Users sessions
    this.getData.receiveData().subscribe((data:Demande)=>{
      console.log(data)
      if (data){
        this.notifiedUser=[]
        this.unNotifiedUser=[]
        data.DemandeUser.forEach((d:any)=>{
          if (d.Session.isNotified==true){
           this.notifiedUser.push(d)
          }else{
            this.unNotifiedUser.push(d)
          }
        })
        this.usersSession = data
        this.addForm.controls['titre'].setValue(this.usersSession?.titre);
        this.addForm.controls['description'].setValue(this.usersSession?.description);
        this.addForm.controls['ServiceId'].setValue(this.usersSession?.ServiceId);
        this.addForm.controls['idDemande'].setValue(this.usersSession?.id);

        if (data.RapportId){
          this.addForm.controls['file'].clearValidators()
          this.addForm.controls['file'].updateValueAndValidity()
          this.addForm.controls['participants'].clearValidators()
          this.addForm.controls['participants'].updateValueAndValidity()
        }
      }
    })


    $(function () {

      $('.left').on('click', function () {
        var container = $(this).closest('.addremove-multiselect');
        moveItems($(container).find('select.multiselect.selected'), $(container).find('select.multiselect.available'));
        getParticipant();
      });

      $('.right').on('click', function () {
        var container = $(this).closest('.addremove-multiselect');
        moveItems($(container).find('select.multiselect.available'), $(container).find('select.multiselect.selected'));
        getParticipant();
      });

      $('.leftall').on('click', function () {
        var container = $(this).closest('.addremove-multiselect');
        moveAllItems($(container).find('select.multiselect.selected'), $(container).find('select.multiselect.available'));
        getParticipant();
      });

      $('.rightall').on('click', function () {
        var container = $(this).closest('.addremove-multiselect');
        moveAllItems($(container).find('select.multiselect.available'), $(container).find('select.multiselect.selected'));
        getParticipant();

      });

      $('select.multiselect.selected').on('dblclick keyup', function (e) {
        if (e.which == 13 || e.type == 'dblclick') {
          var container = $(this).closest('.addremove-multiselect');
          moveItems($(container).find('select.multiselect.selected'), $(container).find('select.multiselect.available'));
          getParticipant();
        }
      });

      $('select.multiselect.available').on('dblclick keyup', function (e) {
        if (e.which == 13 || e.type == 'dblclick') {
          var container = $(this).closest('.addremove-multiselect');
          moveItems($(container).find('select.multiselect.available'), $(container).find('select.multiselect.selected'));
          getParticipant();
        }
      });


    });

    // @ts-ignore
    $.fn.sort_select_box = function () {
      // Get options from select box
      var my_options = $(this).children('option');
      // sort alphabetically
      // @ts-ignore
      my_options.sort(function (a, b) {
        if (a.text > b.text) return 1;
        else if (a.text < b.text) return -1;
        else return 0
      })
      //replace with sorted my_options;
      $(this).empty().append(my_options);

      // clearing any selections
      // @ts-ignore
      $("#" + this.attr('id') + " option").attr('selected', false);
    }

    // @ts-ignore
    function moveItems(origin, dest) {
      $(origin).find(':selected').appendTo(dest);
      $(dest).find(':selected').removeAttr("selected");
      // @ts-ignore
      $(dest).sort_select_box();
    }

    // @ts-ignore
    function moveAllItems(origin, dest) {
      $(origin).children("option:visible").appendTo(dest);
      $(dest).find(':selected').removeAttr("selected");
      // @ts-ignore
      $(dest).sort_select_box();

    }

    const getParticipant = () =>{
      let tab: any= []
      $(".participants option").each(function () {
        tab.push($(this).attr('value'))
      });
     this.addForm.controls['participants'].patchValue(tab)

   }

  }



  get f() {
    // @ts-ignore
    return this.addForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      const {titre, description, ServiceId, statut, idDemande} = this.addForm.value;
      const rapport = new FormData();
      rapport.append('titre', titre);
      rapport.append('description', description);
      rapport.append('ServiceId', ServiceId);
      rapport.append('statut', statut);
      rapport.append('file', this.file);
      rapport.append('idDemande', idDemande);

      for(let i=0; i< this.unNotifiedUser.length; i++){
        for(let j=0; j< this.addForm.value.participants.length; j++) {
          if (this.addForm.value.participants[j]==this.unNotifiedUser[i].id){
            rapport.append('participants[]',JSON.stringify( this.unNotifiedUser[i]))
          }
        }
      }

      if (this.usersSession.RapportId){
        this.allRequest.updateData(`rapport/${this.usersSession.RapportId}`, rapport).subscribe((data: any) => {
          if (data){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Modification réussie',
              showConfirmButton: false,
              timer: 3000
            })
            console.log(data)
            this.closebutton.nativeElement.click();
          }
        })
      }else {
        this.allRequest.postData('rapport/', rapport).subscribe((data: any) => {
          if (data){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Ajout effectue avec succès',
              showConfirmButton: false,
              timer: 3000
            })
            this.closebutton.nativeElement.click();
          }
        })
      }

      this.submitted = false;
      this.addForm.reset()
    }
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

    }
  }

  changeStatut(e:any) {
    if (e.target.value=="visible"){
      $('.usersSession').show()
      this.addForm.controls['participants'].setValidators(Validators.required)
      this.addForm.controls['participants'].updateValueAndValidity()
    }else{
      $('.usersSession').hide()
      this.addForm.controls['participants'].clearValidators()
      this.addForm.controls['participants'].updateValueAndValidity()
      this.addForm.controls['participants'].setValue([])
      $('select#selected-select').find('option').remove().appendTo('#available-select');
    }
  }

  reset() {
    this.addForm.reset();
    this.addForm.controls['statut'].setValue('visible')
    $('select#selected-select').find('option').remove().appendTo('#available-select');
  }
}
