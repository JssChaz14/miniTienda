import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { InventoryService } from '../../services/inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {

  title = 'Agregar inventario a los productos';
  objInventory = { quantity: null, inventory: null };

  products = {};
  inventaries = {};

  constructor(
    private sProduct: ProductService,
    private sInventory: InventoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listProduct();
  }

  addInventory() {
    console.log(this.objInventory);
    this.sInventory.addInventory(this.objInventory).subscribe(
      (resp) => { 
        console.log(resp);
        this.router.navigate(['/inventario']);
      },
      (error) => console.log('error :' + error ));
  }

  listProduct() {
    this.sProduct.listProduct().subscribe( (data) => {
      this.products = data;
      console.log(data);
    });
  }

}
