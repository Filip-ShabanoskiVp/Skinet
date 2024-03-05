import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { ShoppService } from '../shopp.service';
import { error } from 'console';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  product: IProduct | undefined
  quantity = 1;

  constructor(private shopService: ShoppService, private activetedRoute: ActivatedRoute,
    private bcService: BreadcrumbService, private basketService: BasketService,
    private router: Router){
      this.bcService.set('@ProductDetails','');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product!, this.quantity);
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    if(this.quantity>1){
    this.quantity--;
    }
  }

  loadProduct(){
    this.shopService.getProduct(Number(this.activetedRoute.snapshot.paramMap.get('id'))).subscribe(product=>{
      this.product = product;
      this.bcService.set('@ProductDetails', product.name);
    },error =>{
      console.log(error);
    });
  }

  deleteProduct(product: IProduct){
    return this.shopService.deleteProduct(product).subscribe(()=>{
      this.router.navigate(["shop"]);
    },error=>{
      console.log(error);
    })
  }
}

