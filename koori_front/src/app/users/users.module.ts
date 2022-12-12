import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { CommunauteComponent } from './components/communaute/communaute.component';
import { ContactComponent } from './components/contact/contact.component';
import { DemandeComponent } from './components/demande/demande.component';
import { EvaluationNoteComponent } from './components/evaluation-note/evaluation-note.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FicheComponent } from './components/fiche/fiche.component';
import { IboxComponent } from './components/ibox/ibox.component';
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
// import { AuthInterceptor } from './_interceptors/auth.interceptor';
import { SignupComponent } from './components/signup/signup.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { AllServicesResolver } from './_resolvers/all-services.resolver';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { MesDemandesComponent } from './components/user-profil/mes-demandes/mes-demandes.component';
import { SessionsInviteesComponent } from './components/user-profil/sessions-invitees/sessions-invitees.component';
import { TextAnimateComponent } from './components/home/text-animate/text-animate.component';
import { TemoignageComponent } from './components/home/temoignage/temoignage.component';
import { CarouselComponent } from './components/home/carousel/carousel.component';
import { KooriIboxComponent } from './components/home/koori-ibox/koori-ibox.component';
import { DemandesResolver } from './_resolvers/demandes.resolver';
import { ProjectFilterPipe } from './_pipes/project-filter.pipe';
import { CardDemandeComponent } from './components/user-profil/mes-demandes/card-demande/card-demande.component';

@NgModule({
  declarations: [
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
    DemandeComponent,
    DetailServiceComponent,
    ItemRapportComponent,
    LoadingComponent,
    TopComponent,
    FeedbackComponent,
    NotFoundComponent,
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
    UserProfilComponent,
    SessionsInviteesComponent,
    CardDemandeComponent,
    MesDemandesComponent,
    TextAnimateComponent,
    TemoignageComponent,
    CarouselComponent,
    KooriIboxComponent,
    ProjectFilterPipe
    
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
    SigninComponent,
  ],

  providers:[
    BsModalService,
    AllServicesResolver,
    DemandesResolver,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ],
  entryComponents:[SigninComponent, SignupComponent]
})

export class UsersModule { }
