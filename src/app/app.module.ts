import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RicercaFilmComponent } from './ricerca-film/ricerca-film.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { routing } from './app.routing';
import { FilmService } from './_api/services/film.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './_api/api-configuration';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RicercaFilmComponent,
    LayoutsComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    routing,
    TableModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    FilmService,
    ApiConfiguration
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
