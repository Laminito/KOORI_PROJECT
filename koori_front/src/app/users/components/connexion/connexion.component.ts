import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  submitted = false;
  addForm: FormGroup | undefined;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.submitted = true;
  }
}
