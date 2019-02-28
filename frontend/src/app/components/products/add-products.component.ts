import { Component, OnInit } from '@angular/core';

import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {

  title = 'Agregar de Productos';

  public form: Product = {
    name: null, price: null
  };

  products = {};

  constructor(
    public sProduct: ProductService,
    public router: Router) {
    }

  ngOnInit() {
    this.listProduct();
  }

  addProduct() {
    this.sProduct.addProdcut(this.form).subscribe(
      (resp) => { console.log(resp);
    });
    this.router.navigate(['/productos']);
  }

  listProduct() {
    this.sProduct.listProduct().subscribe( (data) => {
      this.products = data;
    });
  }

}
