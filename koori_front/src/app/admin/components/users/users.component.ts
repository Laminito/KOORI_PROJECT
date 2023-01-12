import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { AllRequestService } from '../../_services/all-request.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title: string = 'Dashboard';
  users!: User[]
  constructor(private allRequest: AllRequestService) { }

  ngOnInit(): void {

    this.allRequest.getAll('user').subscribe(
      users => {
        this.users = users
      }
    )












    // $(document).ready(function(){
    //   // Activate tooltip
    //   $('[data-toggle="tooltip"]').tooltip();
      
    //   // Select/Deselect checkboxes
    //   var checkbox = $('table tbody input[type="checkbox"]');
    //   $("#selectAll").click(function(){
    //     if(this.checked){
    //       checkbox.each(function(){
    //         this.checked = true;                        
    //       });
    //     } else{
    //       checkbox.each(function(){
    //         this.checked = false;                        
    //       });
    //     } 
    //   });
    //   checkbox.click(function(){
    //     if(!this.checked){
    //       $("#selectAll").prop("checked", false);
    //     }
    //   });
    // });
    
  }

}
