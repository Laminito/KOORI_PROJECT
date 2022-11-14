import { NgModule } from "@angular/core";
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

@NgModule({
	exports:[
		MatCardModule,
		MatButtonToggleModule,
		MatIconModule,
		MatButtonModule,
		MatListModule
	]
})

export class MaterialModule{

}