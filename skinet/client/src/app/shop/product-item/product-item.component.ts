import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit {

  @Input() product: any

  constructor(private basketServeice: BasketService){}

  ngOnInit(): void {

  }

  addItemToBasket(){
    this.basketServeice.addItemToBasket(this.product);
  }

}
