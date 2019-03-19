import { ApplicationService } from './../_service/application.service';
import { ListItem } from './../_api/models/list-items';
import { Router } from '@angular/router';
import { CustomerService } from '../_api/services/customer.service';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Customer } from '../_api/models/customer';
import { Message, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-customers-lista',
  templateUrl: './customers-lista.component.html',
  styleUrls: ['./customers-lista.component.scss']
})
export class CustomersListaComponent implements OnInit {

  customers: Customer[] = [];

  customer: Customer = { value: null };

  customerSelezionato: Customer;

  newCustomer: boolean;

  showYDSTMW = false;

  msgs: Message[] = [];

  cols: any[];

  displayDialog: boolean;

  showChangePassword = false;

  customerPassword: string;

  newCustomerPassword: string;

  repeatedNewCustomerPassword: string;

  loggedCustomer: Customer;

  sessi: ListItem[];

  category: string[] = [];

  postPath: string;

  @ViewChild('ct') ct: Table;

  constructor(
    private confirmationService: ConfirmationService,
    private customerService: CustomerService,
    private router: Router,
    private renderer: Renderer2,
    private applicationService: ApplicationService
  ) {
    this.customerService.getCustomerByName(sessionStorage.getItem('customerfirstName')).subscribe(notification => {
      this.loggedCustomer = notification;
    });
  }

  ngOnInit() {
    this.subsrcibeToListOfCustomers();
    this.getColumns();
    this.subscribeToListOfCategory();
  }

  getColumns() {

    this.sessi = [
      { _id: '0', label: '', value: '' },
      { _id: 'M', label: 'Maschio', value: 'Maschio' },
      { _id: 'F', label: 'Femmina', value: 'Femmina' }
    ];

    this.cols = [
      { field: 'firstName', header: 'Nome' },
      { field: 'lastName', header: 'Cognome' },
      { field: 'sesso', header: 'Sesso' },
      { field: 'dataDiNascita', header: 'Data di Nascita' },
      { field: 'numeroRichieste', header: 'Richieste' },
      {
        field: 'categoriePreferite',
        header: 'Categorie Preferite',
        renderer: (row: Customer) => {
          if (row.categoriePreferite && row.categoriePreferite.length > 0) {
            return row.categoriePreferite.join(', ');
          } else {
            return '-';
          }
        }
      }
    ];
  }

  subsrcibeToListOfCustomers() {
    this.customerService.getCustomers().subscribe(notification => {
        this.customers = notification;
    });
  }

  subscribeToListOfCategory() {
    this.applicationService.categoriesObservable.subscribe(notificationCategories => {
      this.category = notificationCategories;
    });
  }

  showDialogToAdd() {
    this.customerPassword = undefined;
    this.newCustomerPassword = undefined;
    this.repeatedNewCustomerPassword = undefined;
    this.newCustomer = true;
    this.customer = { value: null };
    this.displayDialog = true;
    this.showChangePassword = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#nome').focus();
    }, 100);
  }

  goToListaRichiesteCustomer(nomeCustomer: string) {
    this.router.navigate(['filmStore/richieste/view', nomeCustomer]);
  }

  manageUser(customer: Customer) {
    this.customerPassword = undefined;
    this.newCustomerPassword = undefined;
    this.repeatedNewCustomerPassword = undefined;
    this.showChangePassword = false;
    this.newCustomer = false;
    this.customer = this.cloneCustomer(customer);
    this.customerSelezionato = customer;
    this.postPath = 'http://localhost:8080/rest/customers/avatar/saveCustomerImage/' + this.customerSelezionato.id;
    this.displayDialog = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#nome').focus();
    }, 100);
  }

  cloneCustomer(r: Customer): Customer {
    const ric = { value: null };
    // tslint:disable-next-line:forin
    for (const prop in r) {
      ric[prop] = r[prop];
    }
    return ric;
  }

  save(pwsChange?: boolean) {
    if (this.newCustomer) {
      if (this.newCustomerPassword === this.repeatedNewCustomerPassword) {
        this.confirmationService.confirm({
          message: 'Sicuro di voler Inserire questo Utente?',
          header: 'Inserimento Utente',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.customer.label = this.customer.firstName;
            this.customer.value = this.customer.firstName;
            this.customer.password = this.newCustomerPassword;
            this.customerService.addCustomer(this.customer).subscribe(response => {
              if (response !== null) {
                this.customers = response as Customer[];
                this.customer = null;
                this.displayDialog = false;
                this.msgs = [{ severity: 'success', summary: 'Inserimento Completato', detail: 'Utente Inserito' }];
              }
            });
          },
          reject: () => {
          }
        });
      } else {
        this.msgs = [{ severity: 'warn', summary: 'Errore Password', detail: 'Attenzione le Password non corrispondono' }];
      }
    } else {
      if (pwsChange) {
        this.customerService.logingCustomer(this.customer, this.customerPassword).subscribe(login => {
          if (login) {
            if (this.newCustomerPassword === this.repeatedNewCustomerPassword) {
              this.confirmationService.confirm({
                message: 'Sicuro di voler Cambiare la Password?',
                header: 'Aggiornamento Password',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                  this.customer.password = this.newCustomerPassword;
                  this.customerService.changeCustomerPsw(this.customer).subscribe(response => {
                    if (response !== null) {
                      this.customers = response as Customer[];
                      this.customer = null;
                      this.displayDialog = false;
                      this.msgs = [{ severity: 'success', summary: 'Aggiornamento Password Completato', detail: 'Password Modificata' }];
                    }
                  });
                },
                reject: () => { }
              });
            } else {
              this.msgs = [{ severity: 'warn', summary: 'Attenzione', detail: 'Le Password non Corrispondono' }];
            }
          } else {
            this.msgs = [{ severity: 'error', summary: 'Errore', detail: 'La Password Attuale non è Corretta' }];
          }
        });
      } else {
        this.confirmationService.confirm({
          message: 'Sicuro di voler Aggiornare questo Utente?',
          header: 'Aggiornamento Utente',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.customer.label = this.customer.firstName;
            this.customer.value = this.customer.firstName;
            this.customerService.updateCustomer(this.customer).subscribe(response => {
              if (response !== null) {
                this.customers = response as Customer[];
                this.displayDialog = false;
                this.msgs = [{ severity: 'success', summary: 'Aggiornamento Completato', detail: 'Utente Aggiornato' }];
              }
            });
          },
          reject: () => { }
        });
      }
    }
  }

  delete() {
    this.confirmationService.confirm({
      message: 'Sicuro di voler Eliminare questo Utente?',
      header: 'Eliminazione Utente',
      icon: 'fa fa-trash',
      accept: () => {
        if (this.customerSelezionato.admin) {
          this.msgs = [{ severity: 'error', summary: 'Attenzione', detail: 'Non è possibile eliminare un Admin' }];
        } else if (this.customerSelezionato.firstName === 'Vincenzo') {
          this.loadMagicWord();
        } else {
          this.customerService.deleteCustomer(this.customerSelezionato.id).subscribe(response => {
            if (response !== null) {
              const index = this.customers.indexOf(this.customerSelezionato);
              this.customers = this.customers.filter((val, i) => i !== index);
              this.customerSelezionato = null;
              this.customer = null;
              this.displayDialog = false;
              this.msgs = [{ severity: 'success', summary: 'Eliminazione Completata', detail: 'Utente Eliminato' }];
            }
          });
        }
      },
      reject: () => { }
    });
  }

  successfulUpload() {
    this.msgs = [{ severity: 'success', summary: 'Aggiornamento Avatar Completato', detail: 'Avatar Modificato' }];
    location.reload();
  }

  errorUpload() {
    this.msgs = [{ severity: 'error', summary: 'Immagine Troppo Grande', detail: 'Caricare un\'immagine più piccola!'}];
  }

  deleteCustomerAvatar() {
    this.confirmationService.confirm({
      message: 'Sicuro di voler Eliminare L\'Avatar di questo Utente?',
      header: 'Eliminazione Avatar',
      icon: 'fa fa-trash',
      accept: () => {
        this.customerSelezionato.avatar = false;
        this.customerSelezionato.avatarBase64 = null;
        this.customerService.updateCustomer(this.customerSelezionato).subscribe(response => {
          if (response !== null) {
            this.msgs = [{ severity: 'success', summary: 'Eliminazione Avatar Completata', detail: 'Avatar Eliminato' }];
            location.reload();
          } else {
            this.msgs = [{ severity: 'error', summary: 'Errore', detail: 'Avatar NON Eliminato' }];
          }
        });
      },
      reject: () => { }
    });
  }

  changeCustomerRole(customerToChange: Customer, role: boolean) {
    if (role) {
      this.confirmationService.confirm({
        message: 'Sicuro di voler Assegnare il Ruolo di Admin a ' + customerToChange.firstName + ' ?',
        header: 'Assegnazione Ruolo Admin',
        accept: () => {
          customerToChange.admin = role;
          this.customerService.updateCustomer(customerToChange).subscribe(response => {
            if (response !== null) {
              this.customers = response as Customer[];
              this.displayDialog = false;
              this.msgs = [{
                severity: 'success', summary: 'Aggiornamento Completato',
                detail: 'Ora l\'utente ' + customerToChange.firstName + ' ' + customerToChange.lastName +
                  ' gode dei privilegi di Admin'
              }];
            }
          });
        },
        reject: () => { }
      });
    } else {
      this.confirmationService.confirm({
        message: 'Sicuro di voler Rimuovere il Ruolo di Admin a ' + customerToChange.firstName + ' ?',
        header: 'Rimozione Ruolo Admin',
        accept: () => {
          if (customerToChange.firstName === 'Vincenzo') {
            this.loadMagicWord();
          } else {
            customerToChange.admin = role;
            this.customerService.updateCustomer(customerToChange).subscribe(response => {
              if (response !== null) {
                this.customers = response as Customer[];
                this.displayDialog = false;
                this.msgs = [{
                  severity: 'success', summary: 'Aggiornamento Completato',
                  detail: 'Ora l\'utente ' + customerToChange.firstName + ' ' + customerToChange.lastName +
                    ' non gode più dei privilegi di Admin'
                }];
                if (this.loggedCustomer.firstName !== 'Vincenzo') {
                  location.reload();
                }
              }
            });
          }
        },
        reject: () => { }
      });
    }
  }

  annul() {
    this.customerPassword = undefined;
    this.newCustomerPassword = undefined;
    this.repeatedNewCustomerPassword = undefined;
    this.showChangePassword = false;
  }

  loadMagicWord() {
    this.showYDSTMW = true;
    const audio = new Audio('../../assets/showcase/audio/AH Ah Ah you didnt say the magic word.flv.mp3');
    audio.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);
    audio.play();
  }

}
