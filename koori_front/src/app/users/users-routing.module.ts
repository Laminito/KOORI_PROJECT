import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AproposComponent } from './components/apropos/apropos.component';
import { CommunauteComponent } from './components/communaute/communaute.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { ContactComponent } from './components/contact/contact.component';
import { DemandeComponent } from './components/demande/demande.component';
import { EvaluationNoteComponent } from './components/evaluation-note/evaluation-note.component';
import { FicheComponent } from './components/fiche/fiche.component';
import { HomeComponent } from './components/home/home.component';
import { IboxComponent } from './components/ibox/ibox.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { KooriComponent } from './components/koori/koori.component';
import { KooriiboxComponent } from './components/kooriibox/kooriibox.component';
import { MenuVerticalComponent } from './components/menu-vertical/menu-vertical.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RapportComponent } from './components/rapport/rapport.component';
import { DetailServiceComponent } from './components/service-catalogue/detail-service/detail-service.component';
import { ServiceCatalogueComponent } from './components/service-catalogue/service-catalogue.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { MesDemandesComponent } from './components/user-profil/mes-demandes/mes-demandes.component';
import { SessionsInviteesComponent } from './components/user-profil/sessions-invitees/sessions-invitees.component';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { AllServicesResolver } from './_resolvers/all-services.resolver';
import { FicheResolverService } from './_resolvers/FicheResolverService';
import { ServiceResolverService } from './_resolvers/ServiceResolverService';


const routes: Routes = [

  {path: '', component: HomeComponent, resolve: { services: AllServicesResolver }},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'kooriibox/ibox', component: IboxComponent, data: {title: 'Ibox', suite: ' ,les activités à faire'}},
  {path: 'kooriibox/koori', component: KooriComponent, data: {title: 'Koori', suite: ' ,les processus à dérouler'}},
  {path: 'service', component: ServiceCatalogueComponent},
  {path: 'rapport', component: RapportComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'kooriibox', component: KooriiboxComponent},
  {path: 'evaluation-note', component: EvaluationNoteComponent},
  {path: 'fiche/:id', component: FicheComponent, resolve: {fiche: FicheResolverService}},
  {path: 'inscription', component: InscriptionComponent},
  {path: 'authentification', component: ConnexionComponent},
  {path: 'apropos', component: AproposComponent},
  {path: 'communaute', component: CommunauteComponent},
  {path: 'menu-vertical', component: MenuVerticalComponent},
  {path: 'demande', component: DemandeComponent},
  {path: 'service/:id', component: DetailServiceComponent, resolve: {service: ServiceResolverService}},
  {path: 'not-found', component: NotFoundComponent },
  {
    path: 'profil',
    component: UserProfilComponent, 
    children: [
      {
        path: 'mesDemandes', 
        component: MesDemandesComponent, 
      },
      {
        path: 'sessionsInvitees',
        component: SessionsInviteesComponent, 
      },
    ],
  },
  {path: '**', redirectTo: '/not-found'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule { }

