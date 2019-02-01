import { HttpClient } from '@angular/common/http';
import { Customer } from './../_api/models/customer';
import { CustomerService } from './../_api/services/customer.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Message, ConfirmationService, SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss']
})
export class CustomerRegistrationComponent implements OnInit {

  customer: Customer = {
    value: null
  };

  registrationForm: FormGroup;

  repeatPassword: string;

  disableSave = true;

  msgs: Message[] = [];

  submitted: boolean;

  genders: SelectItem[];

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private router: Router,
    private customerService: CustomerService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {

    this.renderer.addClass(document.body, 'backImage');

    this.registrationForm = this.formBuilder.group({
      'firstname': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'dataDiNascita': new FormControl('', Validators.required),
      'sesso': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'repeatPassword': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    });

    this.genders = [];
    this.genders.push({ label: 'Select Gender', value: '' });
    this.genders.push({ label: 'Male', value: 'Male' });
    this.genders.push({ label: 'Female', value: 'Female' });
  }

  sessoCheck(s: string) {
    this.customer.sesso = s;
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  registerCustomer() {
    this.saveCustomer();
    this.submitted = true;
  }

  saveCustomer() {
    if (this.customer.password === this.repeatPassword) {
      this.confirmationService.confirm({
        message: 'Sicuro di voler registrare l\'utente ' + this.customer.firstName + ' ' + this.customer.lastName + ' ?',
        header: 'Registrazione Utente',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.customer.label = this.customer.firstName;
          this.customer.value = this.customer.firstName;
          this.customerService.addCustomer(this.customer).subscribe(response => {
            if (response !== null) {
              this.msgs = [{ severity: 'success', summary: 'Registrazione Completata', detail: 'Utente Registrato' }];
              setTimeout(() => {
                this.router.navigate(['login']);
              }, 3000);
            }
          });
        },
        reject: () => {
        }
      });
    } else {
      this.msgs = [{ severity: 'warn', summary: 'Errore Password', detail: 'Attenzione le Password non corrispondono' }];
    }
  }

}
