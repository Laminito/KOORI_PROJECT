import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { CommunauteComponent } from './components/communaute/communaute.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { ContactComponent } from './components/contact/contact.component';
import { DemandeComponent } from './components/demande/demande.component';
import { EvaluationNoteComponent } from './components/evaluation-note/evaluation-note.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FicheComponent } from './components/fiche/fiche.component';
import { IboxComponent } from './components/ibox/ibox.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { KooriComponent } from './components/koori/koori.component';
import { KooriiboxMenuComponent } from './components/kooriibox-menu/kooriibox-menu.component';
import { KooriiboxComponent } from './components/kooriibox/kooriibox.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MenuVerticalComponent } from './components/menu-vertical/menu-vertical.component';
import { NodataComponent } from './components/nodata/nodata.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ItemRapportComponent } from './components/rapport/list-rapports/item-rapport/item-rapport.component';
import { ListRapportsComponent } from './components/rapport/list-rapports/list-rapports.component';
import { RapportComponent } from './components/rapport/rapport.component';
import { DetailServiceComponent } from './components/service-catalogue/detail-service/detail-service.component';
import { NavLinkServiceComponent } from './components/service-catalogue/nav-link-service/nav-link-service.component';
import { ServiceCatalogueComponent } from './components/service-catalogue/service-catalogue.component';
import { SessionComponent } from './components/session/session.component';
import { TopComponent } from './components/top/top.component';
import { FilterPipe } from './_pipes/filter.pipe';
import { SummarizePipe } from './_pipes/summarize.pipe';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    HomeComponent,
    ConnexionComponent,
    AproposComponent,
    KooriiboxComponent,
    KooriComponent,
    EvaluationNoteComponent,
    ContactComponent,
    CommunauteComponent,
    RapportComponent,
    IboxComponent,
    MenuVerticalComponent,
    DemandeComponent,
    DetailServiceComponent,
    ItemRapportComponent,
    LoadingComponent,
    TopComponent,
    FeedbackComponent,
    NotFoundComponent,
    InscriptionComponent,
    NavLinkServiceComponent,
    ServiceCatalogueComponent,
    SummarizePipe,
    FilterPipe,
    SessionComponent,
    NodataComponent,
    FicheComponent,
    ListRapportsComponent,
    KooriiboxMenuComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    UsersRoutingModule,
    ChartsModule
  ],
  exports:[
    HomeComponent,
    ConnexionComponent,
    HomeComponent,
    AproposComponent,
    KooriiboxComponent,
    KooriComponent,
    EvaluationNoteComponent,
    ContactComponent,
    CommunauteComponent,
    RapportComponent,
    IboxComponent,
    MenuVerticalComponent,
    KooriiboxMenuComponent,
    DemandeComponent,
    DetailServiceComponent,
    ItemRapportComponent,
    NodataComponent,
    LoadingComponent,
    TopComponent,
    FeedbackComponent,
    ServiceCatalogueComponent,
    NotFoundComponent,
    InscriptionComponent,
    NavLinkServiceComponent,
    ServiceCatalogueComponent,
    SummarizePipe,
    FilterPipe,
    SessionComponent,
    ItemRapportComponent,
    KooriiboxComponent,
    NodataComponent,
    FicheComponent,
    ListRapportsComponent,
  ]
})
export class UsersModule { }
