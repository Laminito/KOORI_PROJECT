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
import { CardServiceComponent } from './components/home/services/card-service/card-service.component';
import { ProjetsComponent } from './components/home/projets/projets.component';
import { CardProjetComponent } from './components/home/projets/card-projet/card-projet.component';
import { PartenairesComponent } from './components/home/partenaires/partenaires.component';
import { ServicesComponent } from './components/home/services/services.component';
import { SigninComponent } from './components/signin/signin.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './_interceptors/auth.interceptor';
import { SignupComponent } from './components/signup/signup.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { AllServicesResolver } from './_resolvers/all-services.resolver';
import { TextAnimateComponent } from './components/home/text-animate/text-animate.component';
import { ProfilComponent } from './components/profil/profil.component';
import { TemoignageComponent } from './components/home/temoignage/temoignage.component';
import { CarouselComponent } from './components/home/carousel/carousel.component';
import { KooriIboxComponent } from './components/home/koori-ibox/koori-ibox.component';

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
    KooriiboxMenuComponent,
    CardServiceComponent,
    ProjetsComponent,
    CardProjetComponent,
    PartenairesComponent,
    ServicesComponent,
    SigninComponent,
    SignupComponent,
    TextAnimateComponent,
    ProfilComponent,
    TemoignageComponent,
    CarouselComponent,
    KooriIboxComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    UsersRoutingModule,
    RatingModule.forRoot(),
    ModalModule
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
    SigninComponent
  ],

  providers:[BsModalService,
    AllServicesResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents:[SigninComponent, SignupComponent]
})

export class UsersModule { }
