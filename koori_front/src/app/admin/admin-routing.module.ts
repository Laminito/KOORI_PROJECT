import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailDashboardComponent } from './components/dashboard/detail-dashboard/detail-dashboard.component';
import { DemandeAnnuelChartComponent } from './components/detail-deshboard-testing/demande-annuel-chart/demande-annuel-chart.component';
import { DetailDeshboardTestingComponent } from './components/detail-deshboard-testing/detail-deshboard-testing.component';
import { FicheComponent } from './components/fiche/fiche.component';
import { IboxComponent } from './components/ibox/ibox.component';
import { KooriComponent } from './components/koori/koori.component';
import { ListeDemandeComponent } from './components/liste-demande/liste-demande.component';
import { ListeUtilisateurComponent } from './components/liste-utilisateur/liste-utilisateur.component';
import { UtilisateurDetailComponent } from './components/liste-utilisateur/utilisateur-detail/utilisateur-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DetailRapportComponent } from './components/rapport/detail-rapport/detail-rapport.component';
import { RapportComponent } from './components/rapport/rapport.component';
import { AddServiceComponent } from './components/service-catalogue/add-service/add-service.component';
import { DetailServiceComponent } from './components/service-catalogue/detail-service/detail-service.component';
import { EditServiceComponent } from './components/service-catalogue/edit-service/edit-service.component';
import { DetailSessionComponent } from './components/session/detail-session/detail-session.component';
import { SessionComponent } from './components/session/session.component';
import { DetailRapportResolverService } from './_resolvers/DetailRapportResolverService';
import { DetailServiceResolverService } from './_resolvers/DetailServiceResolverService';
import { DetailSessionResolverService } from './_resolvers/DetailSessionResolverService';
import { FicheResolverService } from './_resolvers/FicheResolverService';
import { ListeDemandeByServiceResolver } from './_resolvers/ListeDemandeByServiceResolver';
import { SessionByServiceResolverService } from './_resolvers/SessionByServiceResolverService';

const routes: Routes = [
  {path: '', component: AccueilComponent, 

  children: [
    {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}, children: [
      {path: 'service/:id', component: DetailDashboardComponent, resolve: {detailService: DetailServiceResolverService}},
    ]},
    {path: 'chartTest', component: DemandeAnnuelChartComponent},
      {path: 'ibox', component: IboxComponent},
      {path: 'koori', component: KooriComponent},
      {path: 'fiche/:id', component: FicheComponent, resolve: {fiche: FicheResolverService}},
      {path: 'service/:id', component: DetailServiceComponent, resolve: {detailService: DetailServiceResolverService} },
      {path: 'AddService', component: AddServiceComponent},
      {path: 'edit/:id', component: EditServiceComponent},
      {path: 'rapports/:id/details', component: DetailRapportComponent, resolve: {detailRapport: DetailRapportResolverService}},
      {path: 'rapports', component: RapportComponent},
      {path: 'ListeDemande', component: ListeDemandeComponent, resolve: {listeDemande: ListeDemandeByServiceResolver} },
      {path: 'service/:id/sessions', component: SessionComponent , resolve: {sessionService: SessionByServiceResolverService}},
      {path: 'session/:id', component: DetailSessionComponent , resolve: {session: DetailSessionResolverService} },
      {path: 'utilisateur', component: ListeUtilisateurComponent},
      {path: 'utilisateur-detail/:id', component: UtilisateurDetailComponent},
      { path: 'not-found', component: NotFoundComponent },
      {path: '**', redirectTo: '/not-found'}
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

