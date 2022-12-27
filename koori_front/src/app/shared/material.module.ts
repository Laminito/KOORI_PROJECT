import { NgModule } from "@angular/core";
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkMenuModule} from '@angular/cdk/menu';


@NgModule({
	exports:[
		MatCardModule,
		MatButtonToggleModule,
		MatIconModule,
		MatButtonModule,
		MatListModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatDialogModule,
		MatExpansionModule,
		CdkMenuModule
	]
})

export class MaterialModule{

}