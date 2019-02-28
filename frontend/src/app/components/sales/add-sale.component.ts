import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { SaleService } from '../../services/sale.service';
import { InventoryService } from '../../services/inventory.service';

import { Inventory } from '../../interfaces/inventory';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.scss']
})
export class AddSaleComponent implements OnInit {

  title = 'Agregar venta';
  form = {
    name: null,
    price: null,
    quantity: null,
    product: null,
    total: null,
    inventary: null
  };
  stock;
  showTotal = false;
  products = {};
  objProduct = [];
  inventories: {};
  objInventary;

  constructor(
    private sProduct: ProductService,
    private router: Router,
    private sSale: SaleService,
    private sInventory: InventoryService
  ) { }

  ngOnInit() {
    this.listProduct();
    this.listInventory();
  }

  addSale() {

    let cut = ',';
    let idProduct = this.form.product.split(cut);

    this.form.product = idProduct[0];
    this.form.price = idProduct[1];
    this.form.total = Number(this.form.quantity * this.form.price);



    // tslint:disable-next-line:forin
    for ( let key in this.inventories) {
      let obj = this.inventories[key];
      this.form.inventary = obj.inventory._id;

      if ( this.form.product === obj.inventory._id && Number(this.form.quantity) <= Number(obj.quantity) ) {
          this.objInventary = {
            _id: obj._id,
            quantity: Number(obj.quantity - this.form.quantity),
            inventory: obj.inventory._id,
          };
          console.log('iguales');

          this.sSale.addInventory(this.form).subscribe(
            (resp) => {
              console.log(resp);
              this.update(this.objInventary);
          });
          this.showTotal = true;
          this.stock = '';
          alert('agregada venta');
          this.router.navigate(['/ventas']);

      } else {
        this.stock = 'No hay suficiente stock';
        this.showTotal = false;
      }
    }

  }

  listProduct() {
    this.sProduct.listProduct().subscribe( (data) => {
      this.products = data;
    });
  }

  listInventory() {
    this.sInventory.listInventory().subscribe( (data) => {
      this.inventories = data;
      console.log(data);
    });
  }

  update(obj) {
    this.sInventory.updateInventory(obj).subscribe( (data) => {
      console.log(data);
    }, error => console.log(error));
    this.listProduct();
  }

}
