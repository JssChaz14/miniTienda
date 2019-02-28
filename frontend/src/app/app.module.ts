import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { SalesComponent } from './components/sales/sales.component';
import { InventoryComponent } from './components/inventory/inventory.component';

import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import {NgForm, FormsModule} from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { AddProductsComponent } from './components/products/add-products.component';
import { LogicaComponent } from './components/logica/logica.component';
import { AddInventoryComponent } from './components/inventory/add-inventory.component';
import { AddSaleComponent } from './components/sales/add-sale.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ProductsComponent,
    SalesComponent,
    InventoryComponent,
    HomeComponent,
    AddProductsComponent,
    LogicaComponent,
    AddInventoryComponent,
    AddSaleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
