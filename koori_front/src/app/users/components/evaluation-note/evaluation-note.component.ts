import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import { Rapport } from '../../_models/rapport';
import { AllRequestService } from '../../_services/all-request.service';
import { EvaluationNoteService } from '../../_services/evaluationNoteService';

@Component({
  selector: 'app-evaluation-note',
  templateUrl: './evaluation-note.component.html',
  styleUrls: ['./evaluation-note.component.css']
})
export class EvaluationNoteComponent implements OnInit {

 @Input() isEvaluated!: boolean
 @Input() currentRapport: Rapport = new Rapport()
  evaluationForm!: FormGroup;

  constructor(private evaluationNote: EvaluationNoteService, private allRequest: AllRequestService) {
  }

  ngOnInit(): void {
    this.InitForm()
  }

  InitForm(){
    this.evaluationForm = this.evaluationNote.form
  }

  initId() {

    this.evaluationForm.get('UserId')?.setValue(4)
    this.evaluationForm.get('RapportId')?.setValue(this.currentRapport.id)
    this.evaluationForm.get('statut')?.setValue(false)

    // if (this.currentRapport.isEvaluated){
    //   this.allRequest.getById(`get/evaluation_note/user/4/`, this.currentRapport.id)
    //     .subscribe((evaluationNote)=>{
    //       this.evaluationForm.get('evaluation')?.setValue(evaluationNote['evaluation'])

    //      this.evaluationForm.get('statut')?.setValue(evaluationNote['statut'])

    //       this.evaluationForm.get('note')?.setValue(evaluationNote['note'])
    //     })
    // }
  }

  onSubmitForm() {
    const formValue= this.evaluationForm.value
    console.log(formValue)
      this.allRequest.postData(`evaluation_note/user/${formValue.UserId}/rapport/${formValue.RapportId}`,formValue)
        .subscribe((response)=>{
            this.allRequest.sendNotification(response);
            this.evaluationForm.reset();
        },
          error => console
            .log(error)
        )
  }


}

