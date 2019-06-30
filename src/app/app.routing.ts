import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerSettingComponent } from './customer-setting/customer-setting.component';
import { DettaglioSerieTvComponent } from './dettaglio-serie-tv/dettaglio-serie-tv.component';
import { GestioneSerieTvComponent } from './gestione-serie-tv/gestione-serie-tv.component';
import { GestioneFilmComponent } from './gestione-film/gestione-film.component';
import { StatisticheComponent } from './statistiche/statistiche.component';
import { RicercaSerieTvComponent } from './ricerca-serie-tv/ricerca-serie-tv.component';
import { LoginComponent } from './login/login.component';
import { RichiesteListComponent } from './richieste-list/richieste-list.component';
import { CustomersListaComponent } from './customers-lista/customers-lista.component';
import { DettaglioFilmComponent } from './dettaglio-film/dettaglio-film.component';
import { Routes, RouterModule } from '@angular/router';
import { RicercaFilmComponent } from './ricerca-film/ricerca-film.component';
import { HomeComponent } from './home/home.component';
import { LayoutsComponent } from './layouts/admin/layouts.component';
import { RichiesteUtenteComponent } from './richieste-utente/richieste-utente.component';
import { AuthGuard } from './guards/auth-guard.service';
import { RoleGuard } from './guards/role-guard.service';

const appRoutes: Routes = [
    /** Login */
    { path: 'login', component: LoginComponent, data: { pageTitle: 'Login' } },
    /** Registration */
    { path: 'registration', component: CustomerRegistrationComponent, data: { pageTitle: 'Registration' } },
    /** layouts */
    {path: 'filmStore', component: LayoutsComponent, canActivate: [AuthGuard], children: [
        { path: '', redirectTo: '/filmStore/home', pathMatch: 'full'},
        /** Home */
        { path: 'home', component: HomeComponent, data: { pageTitle: 'Home' } },
        /** Ricerca Film */
        { path: 'ricercaFilm', component: RicercaFilmComponent, data: { pageTitle: 'Ricerca Film' } },
        /** Gestione Film (Admin MODE) */
        { path: 'gestioneFilm', component: GestioneFilmComponent, canActivate: [RoleGuard], data: { pageTitle: 'Gestione Film' } },
        /** Ricerca SerieTV */
        { path: 'ricercaSerieTV', component: RicercaSerieTvComponent, data: { pageTitle: 'Ricerca SerieTV' } },
        /** Gestione SerieTV (Admin MODE) */
        { path: 'gestioneSerieTV', component: GestioneSerieTvComponent, canActivate: [RoleGuard], data: { pageTitle: 'Gestione SerieTV' } },
        /** Dettaglio Film */
        { path: 'Film/view/:id', component: DettaglioFilmComponent, data: { pageTitle: 'Dettaglio Film' } },
        /** Dettaglio SerieTV */
        { path: 'SerieTV/view/:id', component: DettaglioSerieTvComponent, data: { pageTitle: 'Dettaglio SerieTV' } },
        /** Statistiche (Admin MODE) */
        { path: 'statistiche', component: StatisticheComponent, canActivate: [RoleGuard], data: { pageTitle: 'Statistiche' } },
        /** Utenti (Admin MODE) */
        { path: 'utenti', component: CustomersListaComponent, canActivate: [RoleGuard], data: { pageTitle: 'Utenti' } },
        /** Profilo Utente */
        { path: 'profiloUtente', component: CustomerProfileComponent, data: { pageTitle: 'Progilo Utente' } },
        /** Gestione Utente */
        { path: 'gestioneUtente/view/:firstName', component: CustomerSettingComponent, data: { pageTitle: 'Gestione Utente' } },
        /** Richieste (Admin MODE) */
        { path: 'richieste', component: RichiesteListComponent, canActivate: [RoleGuard], data: { pageTitle: 'Richieste' } },
        /** Richieste Utente*/
        { path: 'richieste/view/:firstName', component: RichiesteUtenteComponent, data: { pageTitle: 'Richieste Utente' } },
    ]},
    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);
