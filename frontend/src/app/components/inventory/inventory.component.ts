import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { InventoryService } from '../../services/inventory.service';

import { Inventory } from '../../interfaces/inventory';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  title = 'Inventario';
  inventories: {};
  products: {};
  edit: Inventory;
  id;
  showForm = false;

  constructor(
    private sProduct: ProductService,
    private sInventory: InventoryService,
    public router: Router
  ) { }

  ngOnInit() {
    this.listInventory();
    this.listProduct();
  }

  listInventory() {
    this.sInventory.listInventory().subscribe( (data) => {
      this.inventories = data;
      console.log(data);
    });
  }

  listProduct() {
    this.sProduct.listProduct().subscribe( (data) => {
      this.products = data;
    });
  }

  update(obj) {
    this.sInventory.updateInventory(obj).subscribe( (data) => {
      console.log(data);
    }, error => console.log(error));
    this.listProduct();

    this.showForm = false;
    this.router.navigate(['/inventario']);
  }

  delete( id ) {
    console.log(id);
    this.sInventory.deleteInventory(id).subscribe( (data) => {
      console.log(data);
    });
    this.listProduct();
    this.router.navigate(['/inventario']);

  }

  formUpdate(id) {
    this.id = id;
    this.showForm = true;
  }

}
