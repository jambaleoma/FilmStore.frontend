import { DettaglioFilmComponent } from './dettaglio-film/dettaglio-film.component';
import { Routes, RouterModule } from '@angular/router';
import { RicercaFilmComponent } from './ricerca-film/ricerca-film.component';
import { HomeComponent } from './home/home.component';
import { PalinsestoComponent } from './palinsesto/palinsesto.component';

const appRoutes: Routes = [
    /** Home */
    { path: 'home', component: HomeComponent, data: { pageTitle: 'Home' }},
    /** Ricerca Film */
    { path: 'ricercaFilm', component: RicercaFilmComponent, data: { pageTitle: 'Ricerca Film' }},
    /** Dettaglio Film */
    { path: 'Film/view/:id', component: DettaglioFilmComponent, data: { pageTitle: 'Dettaglio Film' }},
    /** Palinsesto Film */
    { path: 'palinsesto', component: PalinsestoComponent, data: { pageTitle: 'Palinsesto Film' }},
    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);
