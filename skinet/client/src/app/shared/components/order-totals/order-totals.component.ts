import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../../models/basket';
import { BasketService } from '../../../basket/basket.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.scss'
})
export class OrderTotalsComponent implements OnInit{
  basketTotal$: Observable<IBasketTotals | null> | undefined;
  @Input() shippingPrice!: number;
  @Input() subtotal!: number;
  @Input() total!: number;

  constructor(private basketServide: BasketService){}

  ngOnInit(): void {
    this.basketTotal$ = this.basketServide.basketTotal$;
  }



}
