import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppComponent } from './shopp.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddNewProductsComponent } from './add-new-products/add-new-products.component';

const routes: Routes = [
  {path: 'New-Product', component: AddNewProductsComponent, data: {breadcrumb: {alias: 'NewProduct'}}},
  {path: ':id', component: ProductDetailsComponent, data: {breadcrumb: {alias: 'ProductDetails'}}},
  {path: '', component: ShoppComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class ShoppRoutingModule { }
