import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AccueilComponent } from './components/accueil/accueil.component';
import { FicheComponent } from './components/fiche/fiche.component';
import { KooriComponent } from './components/koori/koori.component';
import { TopComponent } from './components/top/top.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SummarizePipe } from './_pipes/summarize.pipe';
import { ServiceCatalogueComponent } from './components/service-catalogue/service-catalogue.component';
import { AddServiceComponent } from './components/service-catalogue/add-service/add-service.component';
import { RapportComponent } from './components/rapport/rapport.component';
import { ItemRapportComponent } from './components/rapport/item-rapport/item-rapport.component';
import { DetailRapportComponent } from './components/rapport/detail-rapport/detail-rapport.component';
import { ListeDemandeComponent } from './components/liste-demande/liste-demande.component';
import { SessionComponent } from './components/session/session.component';
import { DetailSessionComponent } from './components/session/detail-session/detail-session.component';
import { DetailServiceComponent } from './components/service-catalogue/detail-service/detail-service.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListeUtilisateurComponent } from './components/liste-utilisateur/liste-utilisateur.component';
import { AddRapportComponent } from './components/add-rapport/add-rapport.component';
import { UtilisateurDetailComponent } from './components/liste-utilisateur/utilisateur-detail/utilisateur-detail.component';
import { ItemSessionComponent } from './components/session/item-session/item-session.component';
import { AuthComponent } from './components/auth/auth.component';
import { DetailDashboardComponent } from './components/dashboard/detail-dashboard/detail-dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditServiceComponent } from './components/service-catalogue/edit-service/edit-service.component';
import { FilterPipe } from './_pipes/filter.pipe';
import { IboxComponent } from './components/ibox/ibox.component';
import { AddFicheComponent } from './components/add-fiche/add-fiche.component';
import { SharedModule } from '../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { DetailDeshboardTestingComponent } from './components/detail-deshboard-testing/detail-deshboard-testing.component';
import { DemandeAnnuelChartComponent } from './components/detail-deshboard-testing/demande-annuel-chart/demande-annuel-chart.component';
import { NosClientsMensuelComponent } from './components/detail-deshboard-testing/nos-clients-mensuel/nos-clients-mensuel.component';
import { StatutDemandeComponent } from './components/detail-deshboard-testing/statut-demande/statut-demande.component';
import { CardDemandeComponent } from './components/liste-demande/card-demande/card-demande.component';
import { UsersComponent } from './components/users/users.component';
import { CardUserComponent } from './components/users/card-user/card-user.component';

@NgModule({
  declarations: [
    AccueilComponent,
    TopComponent,
    SummarizePipe,
    ServiceCatalogueComponent,
    DetailSessionComponent,
    FooterComponent,
    AuthComponent,
    NotFoundComponent,
    FilterPipe,
    FicheComponent,
    KooriComponent,
    DashboardComponent,
    AddServiceComponent,
    RapportComponent,
    ItemRapportComponent,
    DetailRapportComponent,
    ListeDemandeComponent,
    SessionComponent,
    DetailServiceComponent,
    ListeUtilisateurComponent,
    AddRapportComponent,
    UtilisateurDetailComponent,
    ItemSessionComponent,
    DetailDashboardComponent,
    EditServiceComponent,
    IboxComponent,
    AddFicheComponent,
    DetailDeshboardTestingComponent,
    DemandeAnnuelChartComponent,
    NosClientsMensuelComponent,
    StatutDemandeComponent,
    CardDemandeComponent,
    UsersComponent,
    CardUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgChartsModule
  ],
  exports: [
    AccueilComponent,
    TopComponent,
    SummarizePipe,
    ServiceCatalogueComponent,
    FooterComponent,
    DetailSessionComponent,
    FooterComponent,
    AuthComponent,
    NotFoundComponent,
    FilterPipe,
    FicheComponent,
    KooriComponent,
    DashboardComponent,
    AddServiceComponent,
    RapportComponent,
    ItemRapportComponent,
    DetailRapportComponent,
    ListeDemandeComponent,
    SessionComponent,
    DetailServiceComponent,
    ListeUtilisateurComponent,
    AddRapportComponent,
    UtilisateurDetailComponent,
    ItemSessionComponent,
    DetailDashboardComponent,
    EditServiceComponent,
    IboxComponent,
    AddFicheComponent
  ]
})
export class AdminModule { }

