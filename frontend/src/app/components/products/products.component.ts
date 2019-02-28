import { Component, OnInit } from '@angular/core';
import {NgForm, FormsModule} from '@angular/forms';


import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title = 'Lista de Productos';
  public form: Product = {
    name: null, price: null
  };

  edit: Product;
  showForm = false;
  id;

  products = {};

  constructor(
    public sProduct: ProductService,
    public router: Router) {
    }

  ngOnInit() {
    this.listProduct();
  }

  listProduct() {
    this.sProduct.listProduct().subscribe( (data) => {
      this.products = data;
    });
  }

  update(obj) {
    this.sProduct.updateProduct(obj._id, obj).subscribe( (data) => {
      console.log(data);
    });
    this.listProduct();
    this.showForm = false;
    this.router.navigate(['/productos']);
  }

  delete( id ) {
    console.log(id);
    this.sProduct.deleteProduct(id).subscribe( (data) => {
      console.log(data);
    });
    this.listProduct();
    this.router.navigate(['/productos']);

  }

  formUpdate(id) {
    this.id = id;
    this.showForm = true;
  }

}
