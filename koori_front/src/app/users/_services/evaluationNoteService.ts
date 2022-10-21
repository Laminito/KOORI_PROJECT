import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class EvaluationNoteService {

  constructor() { }

  form: FormGroup = new FormGroup({
    note: new FormControl(null, [Validators.required]),
    evaluation: new FormControl(null, [Validators.required]),
    statut: new FormControl(false, [Validators.required]),
    UserId: new FormControl(null, [Validators.required]),
    RapportId: new FormControl(null, [Validators.required]),
  });


}
