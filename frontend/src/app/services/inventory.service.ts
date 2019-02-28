import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../config/config';
import { Inventory } from '../interfaces/inventory';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor( public http: HttpClient ) { }

  addInventory(inventory: Inventory) {
    let url = URL_SERVICES + '/inventario';
    return this.http.post( url, inventory);
  }

  listInventory() {
    let url = URL_SERVICES + '/inventario';
    return this.http.get( url );
  }

  updateInventory(inventory: Inventory ) {
    let url = URL_SERVICES + '/inventario/' + inventory._id;
    return this.http.put( url, inventory);
  }

  deleteInventory( id ) {
    let url = URL_SERVICES + '/inventario/' + id;
    return this.http.delete( url );
  }

}
