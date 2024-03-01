import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../shared/models/order';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';
import { error } from 'console';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrl: './order-detailed.component.scss'
})
export class OrderDetailedComponent implements OnInit{
  order!: IOrder;

  constructor(private router: ActivatedRoute,private breadcrumbService: BreadcrumbService,
    private orderService: OrdersService){
      this.breadcrumbService.set("@OrderDetailed",'');
    }

  ngOnInit(): void {
    this.orderService.getOrderDetails(Number(this.router.snapshot.paramMap.get('id')))
    .subscribe((order:IOrder)=>{
      this.order = order;
      this.breadcrumbService.set('@OrderDetailed',`Order# ${order.id} - ${order.status}`);
    },error => {
      console.log(error);
    })
  }
}
