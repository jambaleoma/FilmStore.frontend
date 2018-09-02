import { Component, OnInit } from '@angular/core';
import { Customer } from '../_api/models/customer';
import { Richiesta } from '../_api/models/richiesta';
import { CustomerService } from '../_api/services/customer.service';
import { RichiestaService } from '../_api/services/richiesta.service';

@Component({
  selector: 'app-statistiche',
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.scss']
})
export class StatisticheComponent implements OnInit {

  customers: Customer[] = [];

  data: any;

  data1: any;

  richieste: Richiesta[];

  richiestePerNomeUtente: Richiesta[];

  richiestaMese: number[] = [];

  mesiAnno: string[] = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
  'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

  customer2richieste: Map<string, number> = new Map;

  mese2richieste: Map<string, number> = new Map;

  constructor(
    private customerService: CustomerService,
    private richiestaService: RichiestaService
  ) {}

  ngOnInit() {
    this.subsrcibeToListOfCustomers();
    this.getRichieste();
  }

  subsrcibeToListOfCustomers() {
    this.customerService.getCustomers().subscribe(notification => {
      this.customers = notification;
      this.getRichiesteOfCustomers();
    });
  }

  getRichieste() {
    this.richiestaService.getRichieste().subscribe(notification => {
      this.richieste = notification;
      for (const meseAnno of this.mesiAnno) {
        this.mese2richieste.set(meseAnno, 0);
      }
      for (const richiesta of this.richieste) {
        const meseRichiesta = richiesta.dataInserimento.split(' ');
        const mese = meseRichiesta[2];
        if (this.mese2richieste.has(mese)) {
          this.mese2richieste.set(mese, this.mese2richieste.get(mese) + 1);
        } else {
          this.mese2richieste.set(mese, 1);
        }
      }
      this.richiestaMese = Array.from( this.mese2richieste.values() );
    });
  }

  getRichiesteOfCustomers() {
    if (this.customers.length > 0) {
      for (let i = 0; i < this.customers.length; i++) {
        this.richiestaService.getRichiesteByCustomerName(this.customers[i].firstName).subscribe(notification => {
          this.richiestePerNomeUtente = notification;
          this.customers[i].numeroRichieste = this.richiestePerNomeUtente.length;
          this.customer2richieste.set(this.customers[i].firstName, this.customers[i].numeroRichieste);
          this.loadChartRichieste();
          this.loadChartRichiestePerMese();
        });
      }
    }
  }

  loadChartRichieste() {
    if (this.customers.length > 0) {
      this.data = {
        labels: [this.customers[0].firstName, this.customers[1].firstName, this.customers[2].firstName, this.customers[3].firstName],
        datasets: [
          {
            data: [this.customer2richieste.get(this.customers[0].firstName), this.customer2richieste.get(this.customers[1].firstName),
            this.customer2richieste.get(this.customers[2].firstName), this.customer2richieste.get(this.customers[3].firstName)],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#427F31'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#427F31'
            ]
          }]
      };
    }
  }

  loadChartRichiestePerMese() {
    if (this.customers.length > 0) {
      this.data1 = {
        labels: this.mesiAnno,
        datasets: [
          {
            label: 'Richieste nel 2018',
            data: this.richiestaMese,
            fill: false,
            borderColor: '#4bc0c0'
          }
        ]
      };
    }
  }

}
