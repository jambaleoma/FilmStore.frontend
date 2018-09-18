import { Component, OnInit, Renderer2 } from '@angular/core';
import { CustomerService } from '../_api/services/customer.service';
import { Router } from '@angular/router';
import { Customer } from '../_api/models';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  customersItems: Customer[];

  psw: string;

  selectedCustomer: string;

  customer: Customer;

  showDialog = false;

  customerAutenticate: boolean;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private renderer: Renderer2,
    private messageService: MessageService
  ) {
    this.renderer.addClass(document.body, 'backImage');
  }

  ngOnInit() {
    this.subsrcibeToListOfCustomers();
  }

  subsrcibeToListOfCustomers() {
    this.customerService.getCustomers().subscribe(notification => {
      this.customersItems = notification;
    });
  }

  showLoginDilog() {
    this.showDialog = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#loginPassword').focus();
    }, 100);
  }

  loginCustomer(password: string) {
    for (let i = 0; i < this.customersItems.length; i++) {
      if (this.customersItems[i].password === password) {
        this.customerAutenticate = true;
        sessionStorage.setItem('customerfirstName', this.customersItems[i].value);
        sessionStorage.setItem('customerId', this.customersItems[i].id);
        break;
      } else {
        this.customerAutenticate = false;
      }
    }
    if (this.customerAutenticate) {
      this.router.navigate(['filmStore']);
      location.reload();
    } else {
      this.messageService.add({key: 'KO', severity: 'error', summary: 'Accesso Negato', detail: 'Password non Corretta' });
    }
  }

  close() {
    this.psw = null;
    this.showDialog = false;
  }

}
