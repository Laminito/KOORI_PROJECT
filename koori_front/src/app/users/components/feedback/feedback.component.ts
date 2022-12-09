import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Data, Router } from '@angular/router';
import * as $ from 'jquery';
import { Fiche } from '../../_models/fiche';
import { AllRequestService } from '../../_services/all-request.service';
import { FeedbackService } from '../../_services/feedback.service';
import { IboxService } from '../../_services/ibox.service';
import { SenddataService } from '../../_services/senddata.service';
import { EvaluationsService } from '../../_services/evaluations.service';
import { userInfo } from 'os';
import { User } from '../../_models/user';
import { isEmpty, map } from 'rxjs';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  rate!:number;
  isReadOnly!:boolean;
  @Input() evaluation!:any;
  @Input() resources!:any;
  @Input() type!:string;
  isSubmitted!:boolean
  isEvaluated!:boolean
  comment!:string;
  commentaire!:string;

  constructor(private evaluationsService: EvaluationsService, private formBuilder: FormBuilder,
    private feedbackService: FeedbackService, private authService: AuthService,
    private router:Router){
  }

  evaluationForm = this.formBuilder.group({
      commentaire : ['']
    })

  ngOnInit(): void {
    this.rate = 0
    this.isReadOnly = false
    this.isSubmitted = false
    this.isEvaluated = false
    if(this.authService.isLoggedIn()){
      this.evaluationsService.getEvaluationByIdUser(this.resources).subscribe(
        data => {
            
             if(data.note!=0){
              this.rate = data.note
              this.isEvaluated = true
          }

            if(data.evaluation!= 'no comment'){
                this.commentaire = data.evaluation
                this.evaluation.evaluation = data.evaluation  
                this.isSubmitted = true
                this.comment = String(data.evaluation)
            }
          }
          
        ) 
    }
    

    
  }
  
  onSubmit(){
    this.evaluation.evaluation = this.evaluationForm.value.commentaire
    this.evaluationsService.updateEvaluation(this.resources,this.evaluation).subscribe()
    this.comment = String(this.evaluationForm.value.commentaire)
    this.isSubmitted = true
  }

  onEvaluate(){

    if(this.authService.isLoggedIn()){
      this.evaluation.note = this.rate
      this.evaluationsService.updateEvaluation(this.resources,this.evaluation).subscribe()
      this.isEvaluated = true 
    }
    else{
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: "<h4>Veuillez d'abord vous connecter please</h4>",
        cancelButtonText:'Quitter',
        confirmButtonText:'Se Connecter',
        confirmButtonColor:'#338F8E',
        showConfirmButton: true,
        showCancelButton: true,
        timer: 10000
      }).then((result) => {
        if (result.isConfirmed) {
           this.router.navigate(['/home/signin'])
        }
      })
    
    }
    
      
  }

  onModify(){    
    this.isSubmitted = false
  }

  // sendMail(){
  //   if(this.type=='Koori'){
  //     this.feedbackService.postMailKoori({to:User.email,evaluation:this.evaluation.evaluation})
  // }

  // else if(this.type=='Ibox'){
  //   this.feedbackService.postMailIbox({to:User.email,evaluation:this.evaluation.evaluation})
  // }
  // else if(this.type=='Fiche'){
  //   this.feedbackService.postMailFiche(this.evaluation.FicheId,{to:User.email,evaluation:this.evaluation.evaluation}
  // }
  // }
}
