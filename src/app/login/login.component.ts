import { ApplicationService } from './../_service/application.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CustomerService } from '../_api/services/customer.service';
import { Router } from '@angular/router';
import { Customer } from '../_api/models';
import { MessageService } from 'primeng/api';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  customersItems: Customer[];

  psw: string;

  selectedCustomer: string;

  loggingCustomer: Customer;

  showDialog = false;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private renderer: Renderer2,
    private messageService: MessageService,
    private applicationService: ApplicationService,
    private authService: AuthService
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

  showLoginDilog(selectedCustomer: string) {
    this.psw = undefined;
    this.customerService.getCustomerByName(selectedCustomer).subscribe(notification => {
      this.loggingCustomer = notification;
    });
    this.showDialog = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#loginPassword').focus();
    }, 100);
  }

  loginCustomer(password: string) {
    if (password) {
      this.customerService.logingCustomer(this.loggingCustomer, password).subscribe(login => {
        if (login) {
          this.applicationService.firstLogin();
          sessionStorage.setItem('customerfirstName', this.loggingCustomer.value);
          sessionStorage.setItem('customerId', this.loggingCustomer.id);
          if (this.loggingCustomer.admin) {
            this.authService.loginAdmin();
          } else {
            this.authService.login();
          }
        } else {
          this.messageService.add({ key: 'KO', severity: 'error', summary: 'Accesso Negato', detail: 'Password non Corretta' });
        }
      });
    }
  }

  goToRegistration() {
    this.router.navigate(['registration']);
  }

  close() {
    this.psw = null;
    this.showDialog = false;
  }

}
