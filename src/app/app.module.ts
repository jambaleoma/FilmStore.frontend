import { RichiestaService } from './_api/services/richiesta.service';
import { CustomerService } from './_api/services/customer.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RicercaFilmComponent } from './ricerca-film/ricerca-film.component';
import { routing } from './app.routing';
import { FilmService } from './_api/services/film.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './_api/api-configuration';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/components/panelmenu/panelmenu';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { MenubarModule } from 'primeng/menubar';
import { DettaglioFilmComponent } from './dettaglio-film/dettaglio-film.component';
import { StatisticheComponent } from './statistiche/statistiche.component';
import { CustomersListaComponent } from './customers-lista/customers-lista.component';
import { RichiesteListComponent } from './richieste-list/richieste-list.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import {ListboxModule} from 'primeng/listbox';
import { LoginComponent } from './login/login.component';
import { registerLocaleData } from '@angular/common';
import localeITCA from '@angular/common/locales/it';
import { RicercaSerieTvComponent } from './ricerca-serie-tv/ricerca-serie-tv.component';
import { SerieService } from './_api/services/serie.service';
import { SliderModule } from 'primeng/slider';
import {ChartModule} from 'primeng/chart';
import {CardModule} from 'primeng/card';

registerLocaleData(localeITCA);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RicercaFilmComponent,
    DettaglioFilmComponent,
    StatisticheComponent,
    CustomersListaComponent,
    RichiesteListComponent,
    LoginComponent,
    RicercaSerieTvComponent
  ],
  imports: [
    CardModule,
    ChartModule,
    SliderModule,
    ListboxModule,
    DropdownModule,
    DialogModule,
    MenubarModule,
    MultiSelectModule,
    AngularFontAwesomeModule,
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
    RichiestaService,
    SerieService,
    FilmService,
    CustomerService,
    ApiConfiguration,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
