import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppComponent } from './shopp.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppRoutingModule } from './shopp-routing.module';



@NgModule({
  declarations: [
    ShoppComponent,
    ProductItemComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ShoppRoutingModule
  ]
})
export class ShopModule { }
