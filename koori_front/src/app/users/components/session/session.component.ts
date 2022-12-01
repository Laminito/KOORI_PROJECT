import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Session } from '../../_models/session';
import { AllRequestService } from '../../_services/all-request.service';
import { SessionService } from '../../_services/session.service';


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  sessions: Session[]=[]
  evaluationForm!: FormGroup

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private AllRequest: AllRequestService) { }

  ngOnInit(): void {
    this.getSession();
    this.evaluationForm = this.formBuilder.group({
      UserId: [2, Validators.required],
      DemandeId: [2, Validators.required],
      evaluation: ['testons avec cette evaluation', Validators.required],
      note: [5, Validators.required],
    });
  }
  getSession(){
    this.AllRequest.getAll("session/user/1").subscribe((data:any)=>{
      console.log(data);
      this.sessions=data
    })
  }
  get f(){return this.evaluationForm.controls}
  onSubmit(){
    this.sessionService.addEvaluation(this.evaluationForm.value).subscribe(
      (data: any)=>{
         if(data){
          Swal.fire({
            icon: 'success',
            title: 'MERCI BEAUCOUP !',
            text: 'Votre évaluation a été enregistré avec succès.',
            showConfirmButton: false,
            timer: 3000
          })

      }
    }
    )
  }
}
