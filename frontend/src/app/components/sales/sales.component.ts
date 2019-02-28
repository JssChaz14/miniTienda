import { Component, OnInit } from '@angular/core';

import { SaleService } from '../../services/sale.service';
import { Router } from '@angular/router';
import { Sale } from '../../interfaces/sale';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  title = 'Historico de ventas';
  sales = {};

  constructor(
    private sSale: SaleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listSales();
  }

  listSales() {
    this.sSale.listSales().subscribe( (data) => { this.sales = data; console.log(data);
    });
  }
}
