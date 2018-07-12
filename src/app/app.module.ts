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
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/components/panelmenu/panelmenu';
import { FormsModule } from '@angular/forms';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RicercaFilmComponent,
    LayoutsComponent
  ],
  imports: [
    // AngularFontAwesomeModule,
    BrowserModule,
    ButtonModule,
    routing,
    TableModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    CommonModule,
    PanelMenuModule,
    FormsModule
  ],
  providers: [
    FilmService,
    ApiConfiguration
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
