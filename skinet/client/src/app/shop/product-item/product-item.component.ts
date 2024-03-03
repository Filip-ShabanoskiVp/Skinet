import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { IProduct } from '../../shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit {

  @Input() product!: IProduct

  constructor(private basketServeice: BasketService){}

  ngOnInit(): void {

  }

  addItemToBasket(){
    this.basketServeice.addItemToBasket(this.product);
  }

}
