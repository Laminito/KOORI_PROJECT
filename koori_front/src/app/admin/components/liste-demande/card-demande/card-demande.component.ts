import { Component, Input, OnInit } from '@angular/core';
import { Demande } from 'src/app/admin/_models/demande';
import { User } from 'src/app/admin/_models/user';
import { UserService } from 'src/app/admin/_services/user.service';
import { DemandeService } from 'src/app/admin/_services/demande.service';

@Component({
  selector: 'app-card-demande',
  templateUrl: './card-demande.component.html',
  styleUrls: ['./card-demande.component.css']
})
export class CardDemandeComponent implements OnInit {
  @Input() demande!:Demande
  user!:User
  colors:string[] = ['#344DA8','#258F49','#256F49','#CA8654','#FF7713','#FF0000'] 
  statuts:string[]= [  'Nouvelle', 'Traitee', 'Validee','Rejetee','En attente', 'Annulee']
  isClicked!:Boolean;
  isValidated!:Boolean;
  
  constructor(private userService: UserService,
    private demandeService: DemandeService) { }

  ngOnInit(): void {
    // this.userService.getUserById(this.demande.UserId).subscribe(
    //   data => this.user = data
    // )
    this.isClicked = false
    this.isValidated = false
    if(this.demande.statut === 'Validee'){
      this.isValidated = true
    }
  }

  changeStatut() {
    this.isClicked = true
    }
    
  saveChangeStatut(event:any){
    let id = event.target.getAttribute('id')
    let input1 = $(`#statut${this.demande.id}`)
    this.isClicked = false
    this.demande.statut = String(input1.val()).charAt(0).toUpperCase() + String(input1.val()).slice(1)
    console.log(id);
    let obj = {
      statut: String(input1.val()).charAt(0).toUpperCase() + String(input1.val()).slice(1),
      text: 'par defaut'
    }
    if(obj.statut === 'Validee'){
      this.isValidated = true
    }
    console.log(obj);
    
    this.demandeService.updateStatutDemande(id, obj).subscribe()
  }



  downloadExcelFile(evt: any) {
    console.log('Method is called');
    
    // const target: DataTransfer = <DataTransfer>(evt.target);

    // if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    // const reader: FileReader = new FileReader();
    // reader.onload = (e: any) => {
    //   const bstr: string = e.target.result;
    //   const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
    //   const wsname: string = wb.SheetNames[0];
    //   const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    //   // console.log(ws);
    //   this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
    // };
    // reader.readAsBinaryString(target.files[0]);

  }


}
