import { ApplicationService } from './_service/application.service';
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
import { FormsModule, FormBuilder, NgControl, ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { MenubarModule } from 'primeng/menubar';
import { DettaglioFilmComponent } from './dettaglio-film/dettaglio-film.component';
import { StatisticheComponent } from './statistiche/statistiche.component';
import { CustomersListaComponent } from './customers-lista/customers-lista.component';
import { RichiesteListComponent } from './richieste-list/richieste-list.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { LoginComponent } from './login/login.component';
import { registerLocaleData } from '@angular/common';
import localeITCA from '@angular/common/locales/it';
import { RicercaSerieTvComponent } from './ricerca-serie-tv/ricerca-serie-tv.component';
import { SerieService } from './_api/services/serie.service';
import { SliderModule } from 'primeng/slider';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { GestioneFilmComponent } from './gestione-film/gestione-film.component';
import { GestioneSerieTvComponent } from './gestione-serie-tv/gestione-serie-tv.component';
import { SpinnerModule } from 'primeng/spinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { GrowlModule } from 'primeng/growl';
import { RichiesteUtenteComponent } from './richieste-utente/richieste-utente.component';
import { DettaglioSerieTvComponent } from './dettaglio-serie-tv/dettaglio-serie-tv.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { ChipsModule } from 'primeng/chips';
import { CustomerSettingComponent } from './customer-setting/customer-setting.component';
import { CarouselModule } from 'primeng/carousel';
import { StagioneService } from './_api/services/stagione.service';
import { InputMaskModule } from 'primeng/inputmask';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { VotoService } from './_api/services/voto.service';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';
import { PickListModule } from 'primeng/picklist';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { AuthGuard } from './guards/auth-guard.service';
import { RoleGuard } from './guards/role-guard.service';
import { AuthService } from './_service/auth.service';

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
    RicercaSerieTvComponent,
    GestioneFilmComponent,
    GestioneSerieTvComponent,
    RichiesteUtenteComponent,
    DettaglioSerieTvComponent,
    CustomerSettingComponent,
    CustomerProfileComponent,
    CustomerRegistrationComponent
  ],
  imports: [
    BlockUIModule,
    ProgressSpinnerModule,
    PickListModule,
    FileUploadModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ToggleButtonModule,
    RatingModule,
    ProgressBarModule,
    InputMaskModule,
    CarouselModule,
    ChipsModule,
    PanelModule,
    DataViewModule,
    InputTextareaModule,
    GrowlModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    ToastModule,
    SpinnerModule,
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
    FormBuilder,
    VotoService,
    StagioneService,
    ApplicationService,
    ConfirmationService,
    MessageService,
    RichiestaService,
    SerieService,
    FilmService,
    CustomerService,
    ApiConfiguration,
    AuthService,
    AuthGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
