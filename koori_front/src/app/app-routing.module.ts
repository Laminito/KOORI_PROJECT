import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

<<<<<<< HEAD
const routes: Routes = [];
=======
const routes: Routes = [
  {path: 'home', loadChildren: ()=> import('./users/users.module').then(m=>m.UsersModule)},
  {path: 'admin', loadChildren: ()=> import('./admin/admin.module').then(m=>m.AdminModule)},
  {path: '**', redirectTo: 'home'}
];
>>>>>>> e83f12046cab025fe45318f87acd97704f3a3c6d

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
<<<<<<< HEAD
=======

>>>>>>> e83f12046cab025fe45318f87acd97704f3a3c6d
