import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Evaluation_koori } from '../../_models/evaluation_koori';
import { Koori } from '../../_models/koori';
import { User } from '../../_models/user';
import { KooriService } from '../../_services/koori.service';

@Component({
  selector: 'app-koori',
  templateUrl: './koori.component.html',
  styleUrls: ['./koori.component.scss']
})
export class KooriComponent implements OnInit {
  addForm: object = {};
  koori: Koori = new Koori()
  versions: Koori[] = []
  title = '';
  p=1
  selectedDevice : number = 0;
  tab: Evaluation_koori[] = []
  Users: User[] = []
  constructor(private kooriservice: KooriService) {
    this.title= 'Koori'
  }
  ngOnInit(): void {
    this.kooriservice.getVersions().subscribe((data:any)=>{
      this.versions = data
      this.selectedDevice = this.versions[0].version
      this.getEvaluations(this.selectedDevice)
      this.kooriservice.getKooriByVersion(this.selectedDevice).subscribe((data:any)=>{
        this.koori = new Koori().deserialize(data)
        this.addForm = {
          description: this.koori.description,
          quoi: this.koori.quoi,
          quand: this.koori.quand,
          comment: this.koori.comment
        }
      })
    })
    $('.fa-pencil-alt').on('click', (e) => {
      const description = $('.description');
      const quoi = $('.quoi');
      const quand = $('.quand');
      const comment = $('.comment');
      description.hide()
      quoi.hide()
      quand.hide()
      comment.hide()
      let inputDes = $("<input type='text' class='form-control' style='background: #ECECEC;\n" +
        "  box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.17);\n" +
        "  border-radius: 5px;\n" +
        "  border: solid 1px var(--vert);'>")
      let inputQuoi = $("<textarea style='background: #ECECEC;\n" +
        "  box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.17);\n" +
        "  border-radius: 5px;\n" +
        "  border: solid 1px var(--vert); width: 100%'></textarea>")
      let inputQuand = $("<textarea style='background: #ECECEC;\n" +
        "  box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.17);\n" +
        "  border-radius: 5px;\n" +
        "  border: solid 1px var(--vert); width: 100%'></textarea>")
      let inputComment = $("<textarea style='background: #ECECEC;\n" +
        "  box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.17);\n" +
        "  border-radius: 5px;\n" +
        "  border: solid 1px var(--vert); width: 100%'></textarea>")
      inputDes.appendTo($(".row-description"));
      inputQuoi.appendTo($("#tab-one-panel"));
      inputQuand.appendTo($("#tab-two-panel"));
      inputComment.appendTo($("#tab-three-panel"));
      // @ts-ignore
      inputDes.val(description[0].innerText)
      inputQuoi.val(quoi[0].innerText)
      inputQuand.val(quand[0].innerText)
      inputComment.val(comment[0].innerText)
      $('.fa-pencil-alt').removeClass('fa-pencil-alt').addClass('fa-check')
      $('.fa-check').css("color", "green")
      $('.fa-check').off("click").on('click', () => {
        this.addForm = {
          description: inputDes.val(),
          quoi: inputQuoi.val(),
          quand: inputQuand.val(),
          comment: inputComment.val()
        }
        this.kooriservice.updateKoori(this.koori.id, this.addForm).subscribe((data:any)=>{
          this.koori = data
          this.kooriservice.getVersions().subscribe((data:any)=>{
            this.versions = data
            this.selectedDevice = this.versions[0].version
            inputDes.hide()
            inputQuoi.hide()
            inputQuand.hide()
            inputComment.hide()
            description.show()
            quoi.show()
            quand.show()
            comment.show()
            // @ts-ignore
            description.val(this.koori.description)
            // @ts-ignore
            quoi.val(this.koori.quoi)
            // @ts-ignore
            quand.val(this.koori.quand)
            // @ts-ignore
            comment.val(this.koori.comment)
            $('.fa-check').removeClass('fa-check').addClass('fa-pencil-alt')
            $('.fa-pencil-alt').css("color", "#FFA000")
            $('.fa-pencil-alt').off('click')
          })
        })
      })
    })
  }
  onChange(newValue: number) {
    this.selectedDevice = newValue;
    if(this.selectedDevice < this.versions[0].version){
      $('.fa-pencil-alt').hide()
    }
    else{
      $('.fa-pencil-alt').show()
    }
    this.getEvaluations(this.selectedDevice)
    this.kooriservice.getKooriByVersion(this.selectedDevice).subscribe((data:any)=>{
      this.koori = new Koori().deserialize(data)
    })
  }
  getEvaluations(id: any){
    while(this.tab.length > 0) {
      this.tab.pop();
    }
    while(this.Users.length > 0) {
      this.Users.pop();
    }
    this.kooriservice.getEvaluations(id).subscribe((data: any)=>{
      this.tab = data
      for(let u of this.tab){
        // @ts-ignore
        this.Users.push(u['User'])
      }
    })
  }
}
