import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppComponent } from './shopp.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path: '', component: ShoppComponent},
  {path: ':id', component: ProductDetailsComponent, data: {breadcrumb: {alias: 'ProductDetails'}}},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class ShoppRoutingModule { }
