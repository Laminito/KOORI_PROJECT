import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Data } from '@angular/router';
import * as $ from 'jquery';
import { Fiche } from '../../_models/fiche';
import { AllRequestService } from '../../_services/all-request.service';
import { FeedbackService } from '../../_services/feedback.service';
import { IboxService } from '../../_services/ibox.service';
import { SenddataService } from '../../_services/senddata.service';
import { EvaluationsService } from '../../_services/evaluations.service';
import { userInfo } from 'os';
import { User } from '../../_models/user';

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


  constructor(private evaluationsService: EvaluationsService, private formBuilder: FormBuilder,
    private feedbackService: FeedbackService){
  }

  evaluationForm = this.formBuilder.group({
      commentaire : ['']
    })

  ngOnInit(): void {
    //METTRE this.rate = rateofuser; this.comment = commentofuser; this.Evaluated = true; this.isSubmitted = true; if user rated earlier
    this.rate = 0
    this.isReadOnly = false
    this.isSubmitted = false
    this.isEvaluated = false
  }
  
  onSubmit(){
    this.evaluation.evaluation = this.evaluationForm.value.commentaire
    //this.evaluationsService.updateEvaluation(this.resources,{evaluation:this.evaluation.evaluation}).subscribe()
    this.evaluationsService.simulateUpdatingEvaluation(this.evaluation,this.type)
    this.comment = String(this.evaluationForm.value.commentaire)
    this.isSubmitted = true
    console.log(this.comment);
  }

  onEvaluate(){
    //if(this.rate == 0){
    //this.evaluationsService.saveEvaluation(this.resources,this.evaluation).subscribe()
      this.evaluationsService.simulateSavingEvaluation(this.evaluation,this.type)
    //}
    //else{
    //this.evaluationsService.updateEvaluation(this.resources,{note:this.evaluation.note}).subscribe()
      //this.evaluationsService.simulateUpdatingEvaluation(this.evaluation,this.type)
    //}
    this.isEvaluated = true
    //this.sendMail();
    console.log(this.evaluation);
    
  }

  onModify(){
    this.isSubmitted = false
    this.evaluationForm.value.commentaire = this.comment //NE PAS OUBLIER QUE CETTE VALEUR DOIT VENIR DE LA BASE POUR CHAQUE USER QUI SE CONNECTE
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
