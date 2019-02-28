import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../config/config';



@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor( public http: HttpClient ) { }

  addProdcut(product: Product) {
    let url = URL_SERVICES + '/productos';
    return this.http.post( url, product);
  }

  listProduct() {
    let url = URL_SERVICES + '/productos';
    return this.http.get( url );
  }

  updateProduct(id, product: Product ) {
    let url = URL_SERVICES + '/productos/' + id;
    return this.http.put( url, product);
  }

  deleteProduct( id ) {
    let url = URL_SERVICES + '/productos/' + id;
    return this.http.delete( url );
  }
}
