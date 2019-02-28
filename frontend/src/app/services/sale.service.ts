import { Injectable } from '@angular/core';

import { Sale } from '../interfaces/sale';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../config/config';
import { Inventory } from '../interfaces/inventory';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor( public http: HttpClient ) { }

  listSales() {
    let url = URL_SERVICES + '/ventas';
    return this.http.get( url );
  }

  addInventory(inventory: Inventory) {
    let url = URL_SERVICES + '/ventas';
    return this.http.post( url, inventory);
  }
}
