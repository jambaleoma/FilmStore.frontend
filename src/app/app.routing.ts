import { LoginComponent } from './login/login.component';
import { RichiesteListComponent } from './richieste-list/richieste-list.component';
import { CustomersListaComponent } from './customers-lista/customers-lista.component';
import { DettaglioFilmComponent } from './dettaglio-film/dettaglio-film.component';
import { Routes, RouterModule } from '@angular/router';
import { RicercaFilmComponent } from './ricerca-film/ricerca-film.component';
import { HomeComponent } from './home/home.component';
import { PalinsestoComponent } from './palinsesto/palinsesto.component';

const appRoutes: Routes = [
    /** Login */
    { path: 'login', component: LoginComponent, data: { pageTitle: 'Login' }},
    /** Home */
    { path: 'home', component: HomeComponent, data: { pageTitle: 'Home' }},
    /** Ricerca Film */
    { path: 'ricercaFilm', component: RicercaFilmComponent, data: { pageTitle: 'Ricerca Film' }},
    /** Dettaglio Film */
    { path: 'Film/view/:id', component: DettaglioFilmComponent, data: { pageTitle: 'Dettaglio Film' }},
    /** Palinsesto Film */
    { path: 'palinsesto', component: PalinsestoComponent, data: { pageTitle: 'Palinsesto Film' }},
    /** Utenti */
    { path: 'utenti', component: CustomersListaComponent, data: { pageTitle: 'Utenti' }},
    /** Richieste */
    { path: 'richieste', component: RichiesteListComponent, data: { pageTitle: 'Richieste' }},
    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);
