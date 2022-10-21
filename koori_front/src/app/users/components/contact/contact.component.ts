import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../_models/contact';
import { AllRequestService } from '../../_services/all-request.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  //private id: any;

  contacts : Contact[]=[]
  //contacts: Contact = new Contact;


  constructor(
    //private route: ActivatedRoute,
    private allRequest: AllRequestService
  ) { }

  ngOnInit(): void {
    //this.getByIdContact()
    this.getContact()

  }

  // getByIdContact(){
  //   this.id = this.route.snapshot.paramMap.get('id'); // il permet recuperer la valeur de l'id
  //   this.contactService.getByIdContact(this.id)
  //   .subscribe((data: any) => {
  //       this.contact = data;
  //   });
  // }
  getContact(){
    this.allRequest.getAll("get/contact/").subscribe((data:any)=>{
       this.contacts=data.map((contact:Contact)=>new Contact().deserialize(contact));
    })
  }

}
