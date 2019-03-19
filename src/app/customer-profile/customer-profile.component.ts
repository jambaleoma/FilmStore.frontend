import { ApplicationService } from './../_service/application.service';
import { ListItem } from './../_api/models/list-items';
import { Router } from '@angular/router';
import { CustomerService } from '../_api/services/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../_api/models/customer';
import { Message, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  customers: Customer[] = [];

  customer: Customer = { value: null };

  msgs: Message[] = [];

  cols: any[];

  displayCategoryDialog: boolean;

  loggedCustomer: Customer;

  sessi: ListItem[];

  category: string[] = [];

  customerCategory: ListItem[] = [];

  @ViewChild('ct') ct: Table;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private applicationService: ApplicationService,
    private confirmationService: ConfirmationService,
  ) {
    this.customerService.getCustomerByName(sessionStorage.getItem('customerfirstName')).subscribe(notification => {
      if (notification) {
        this.loggedCustomer = notification;
        this.customers.push(this.loggedCustomer);
        if (this.customers[0].categoriePreferite) {
          for (const cat of this.customers[0].categoriePreferite) {
            const listItem: ListItem = {
              _id: cat,
              value: cat,
              label: cat,
            };
            this.customerCategory.push(listItem);
          }
        }
        this.applicationService.categoriesObservable.subscribe(notificationCategories => {
          if (notificationCategories) {
            for (const category of this.customerCategory) {
              for (const allCat of notificationCategories) {
                if (category.value === allCat.value) {
                  const index = notificationCategories.indexOf(allCat);
                  notificationCategories.splice(index, 1);
                }
              }
            }
            this.category = notificationCategories;
          }
        });
      }
    });
  }

  ngOnInit() {
    this.getColumns();
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
      { field: 'dataDiNascita', header: 'Data di Nascita' }
    ];
  }

  goToListaRichiesteCustomer(nomeCustomer: string) {
    this.router.navigate(['filmStore/richieste/view', nomeCustomer]);
  }

  save(customer: Customer) {
    this.customer = customer;
    this.customer.categoriePreferite = [];
    for (const cat of this.customerCategory) {
      this.customer.categoriePreferite.push(cat.value);
    }
    this.confirmationService.confirm({
      message: 'Sicuro di voler Salvare queste Categorie?',
      header: 'Salvataggio Categorie',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customerService.updateCustomer(this.customer).subscribe(response => {
          if (response !== null) {
            this.displayCategoryDialog = false;
            this.msgs = [{ severity: 'success', summary: 'Salvataggio Completato', detail: 'Categorie Salvate con Successo' }];
          }
        });
      },
      reject: () => {
      }
    });
  }

}
