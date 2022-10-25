import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Data } from '@angular/router';
import * as $ from 'jquery';
import { Fiche } from '../../_models/fiche';
import { AllRequestService } from '../../_services/all-request.service';
import { FeedbackService } from '../../_services/feedback.service';
import { IboxService } from '../../_services/ibox.service';
import { SenddataService } from '../../_services/senddata.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  @ViewChild('closebutton') closebutton:any;
  submitted = false;
  addForm!: FormGroup;
  comment!: FormGroup;
  commentIbox!: FormGroup;
  commentFiche!: FormGroup;
  
  laroute:string=""
  imgfeedback:string=""
  fiche: Fiche = new Fiche();
  constructor(private formBuilder: FormBuilder,
              private feedback: FeedbackService,
              private route: ActivatedRoute,
              private iboxservice: IboxService,
              private senddata: SenddataService,
              private allRequest: AllRequestService) { }

  ngOnInit(): void {
    this.route.url.subscribe(
      (res) => {
        this.laroute = res[1].path.trim()
        if (this.laroute.includes('koori') || this.laroute.includes('ibox')){
          this.imgfeedback = (this.laroute + ".png").trim()
        }
        else{
          this.route.
          data.subscribe(
            (data: Data) => {
              this.fiche = data['fiche'];
            }
          );
        }
      })

  this.addForm = this.formBuilder.group({
    to: ['', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]],
    text: ['', Validators.required],
  });
  this.comment = new FormGroup({
    evaluation: new FormControl(null,Validators.required),
    UserId: new FormControl(null,Validators.required),
    KooriId: new FormControl(null,Validators.required),
  });
    this.commentIbox = new FormGroup({
      evaluation: new FormControl(null,Validators.required),
      UserId: new FormControl(null,Validators.required),
      IboxId: new FormControl(null,Validators.required),
    });
    this.commentFiche = new FormGroup({
      evaluation: new FormControl(null,Validators.required),
      UserId: new FormControl(null,Validators.required),
      FicheId: new FormControl(null,Validators.required),
    });
}
get f()
{
  // @ts-ignore
  return this.addForm.controls;
}
onSubmit(){
  this.submitted = true;
  this.route.url.subscribe(
    (res) => {
      if (this.laroute === "koori"){
        if(this.addForm?.valid){
          this.comment?.get('evaluation')?.setValue(this.addForm?.get('text')?.value)
          this.comment?.get('KooriId')?.setValue(this.senddata.getId())
          this.comment?.get('UserId')?.setValue(2)
          const formValue= this.comment?.value
          this.feedback.postMailKoori(this.addForm?.value).subscribe(
            this.allRequest.postData(`add/evaluation_koori/user/${formValue.UserId}/koori/${formValue.KooriId}`,formValue)
              .subscribe(response=>{
                  this.comment?.reset();
                  this.submitted = false;
                  this.addForm?.reset()
                  // @ts-ignore
                  $('.btn-evaluer').add('data-bs-dismiss', "modal")
                },
                error => console.log(error)
              ),
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'MERCI BEAUCOUP !',
              text: 'Votre évaluation a été soumise avec succès.\n' +
                'Nous en tiendrons compte',
              showConfirmButton: false,
              timer: 3000
            })
          )
          this.closebutton.nativeElement.click();
        }
      }
      else{
        if (this.laroute === "ibox"){
          if (this.addForm?.valid){
            this.iboxservice.getIbox().subscribe((data: { id: any; })=>{
              this.commentIbox?.get('evaluation')?.setValue(this.addForm?.get('text')?.value)
              this.commentIbox?.get('IboxId')?.setValue(data.id)
              this.commentIbox?.get('UserId')?.setValue(2)
              const formValue= this.commentIbox?.value
              this.feedback.postMailIbox(this.addForm?.value).subscribe(
                this.allRequest.postData(`add/evaluation_ibox/user/${formValue.UserId}/ibox/${formValue.IboxId}`,formValue)
                  .subscribe(response=>{
                      this.commentIbox?.reset();
                      this.submitted = false;
                      this.addForm?.reset()
                      // @ts-ignore
                      $('.btn-evaluer').add('data-bs-dismiss', "modal")
                    },
                    error => console.log(error)
                  ),
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'MERCI BEAUCOUP !',
                  text: 'Votre évaluation a été soumise avec succès.\n' +
                    'Nous en tiendrons compte',
                  showConfirmButton: false,
                  timer: 3000
                })
              )
              this.closebutton.nativeElement.click();
            })
          }
        }
        else{
          if (this.addForm?.valid){
            this.commentFiche?.get('evaluation')?.setValue(this.addForm?.get('text')?.value)
            this.commentFiche?.get('FicheId')?.setValue(parseInt(res[1].path.trim()))
            this.commentFiche?.get('UserId')?.setValue(2)
            const formValue= this.commentFiche?.value
            this.feedback.postMailFiche(parseInt(res[1].path.trim()), this.addForm?.value).subscribe(
              this.allRequest.postData(`add/evaluation_fiche/user/${formValue.UserId}/fiche/${formValue.FicheId}`,formValue)
                .subscribe(response=>{
                    this.commentFiche?.reset();
                    this.submitted = false;
                    this.addForm?.reset()
                    // @ts-ignore
                    $('.btn-evaluer').add('data-bs-dismiss', "modal")
                  },
                  error => console.log(error)
                ),
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'MERCI BEAUCOUP !',
                text: 'Votre évaluation a été soumise avec succès.\n' +
                  'Nous en tiendrons compte',
                showConfirmButton: false,
                timer: 3000
              })
            )
            this.closebutton.nativeElement.click();
          }
        }
      }
    }
  );
}
}
