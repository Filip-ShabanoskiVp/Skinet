import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/models/basket';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent implements OnInit{
  @Input() appStepper!: CdkStepper;
  basket$!: Observable<IBasket | null>;
  constructor(private basketService: BasketService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  createPaymentIntent() {
    return this.basketService.createPaymentIntent().subscribe((response:any)=>{
      // this.toastr.success("Payment intent created");
      this.appStepper.next();
    },error => {
      console.log(error);
      // this.toastr.error(error.message);
    })
  }

}
