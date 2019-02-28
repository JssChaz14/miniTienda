import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { SalesComponent } from './components/sales/sales.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { HomeComponent } from './components/home/home.component';
import { AddProductsComponent } from './components/products/add-products.component';
import { LogicaComponent } from './components/logica/logica.component';
import { AddInventoryComponent } from './components/inventory/add-inventory.component';
import { AddSaleComponent } from './components/sales/add-sale.component';

const routes: Routes = [
  {
    path: 'ventas',
    component: SalesComponent,
    data: { title: 'Ventas' }
  },
  {
    path: 'agregar-ventas',
    component: AddSaleComponent,
    data: { title: 'Agregar Ventas' }
  },
  {
    path: 'inventario',
    component: InventoryComponent,
    data: { title: 'Inventario' }
  },
  {
    path: 'agregar-inventario',
    component: AddInventoryComponent,
    data: { title: 'Agregar Inventario' }
  },
  {
    path: 'productos',
    component: ProductsComponent,
    data: { title: 'Lista de productos' }
  },
  {
    path: 'agregar-producto',
    component: AddProductsComponent,
    data: { title: 'Agregar de productos' }
  },
  {
    path: 'calcular',
    component: LogicaComponent,
    data: { title: 'Calcular' }
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
