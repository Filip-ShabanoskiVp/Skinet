import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from '../../shared/models/basket';
import { IOrder, IOrderToCreate } from '../../shared/models/order';
import { NavigationExtras, Router } from '@angular/router';

declare var Stripe: any;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss'
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy{
  @Input() checkoutForm?: FormGroup;
  @ViewChild('cardNumber') cardNumberElement!: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement!: ElementRef;
  @ViewChild('cardCvc') cardCvcElement!: ElementRef;

  stripe:any;
  cardNumber: any;
  cardExpiry:any;
  cardCvc: any
  cardErrors: any;
  CardHandler = this.onChange.bind(this);
  loading = false;
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;

  constructor(private basketService: BasketService, private checkoutService: CheckoutService,
    private toastr: ToastrService, private router: Router){
    }


  ngOnDestroy() {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  onChange(event:any) {
    console.log(event);
    if(event.error){
      this.cardErrors = event.error.message;
    } else{
      this.cardErrors = null;
    }
    switch(event.elementType) {
      case 'cardNumber':
      this.cardNumberValid = event.complete;
      break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        break
    }
  }

  ngAfterViewInit() {

      this.stripe = Stripe('pk_test_51OooPwCkjmbSmSwwKuGvXuZ4XOCC2wCvcYhaJyWBENkbGRX8UAnPraehqusyDd9Xie5nidedkqS8p02hy1ojiLlT003C0nEzn4');

      const elements = this.stripe.elements();
      this.cardNumber = elements.create('cardNumber');
      this.cardNumber.mount(this.cardNumberElement.nativeElement);
      this.cardNumber.addEventListener('change', this.CardHandler);

      this.cardExpiry = elements.create('cardExpiry');
      this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
      this.cardExpiry.addEventListener('change', this.CardHandler);

      this.cardCvc = elements.create('cardCvc');
      this.cardCvc.mount(this.cardCvcElement.nativeElement);
      this.cardCvc.addEventListener('change', this.CardHandler);

  }


  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();

    try {
      const createdOrder = await this.createOrder(basket!);
      const paymentResult = await this.confirmPaymentWithStripe(basket!);

      if(paymentResult.paymentIntent) {
        this.basketService.deleteBasket(basket!);
        const navigationExtras: NavigationExtras = {state: createdOrder}
        this.router.navigate(['checkout/success'], navigationExtras);
      } else {
        this.toastr.error(paymentResult.error.message);
      }
      this.loading = false;
    } catch (error) {
      console.log(error)
      this.loading = false;
    }
  }
  private async confirmPaymentWithStripe(basket:IBasket) {
   return this.stripe.confirmCardPayment(basket?.clinetSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
        }
      }
    });
  }

  private async createOrder(basket: IBasket) {
    const orderToCreate = this.getOrderToCreate(basket!);

    return this.checkoutService.createOrder(orderToCreate).toPromise();
  }

  private getOrderToCreate(basket: IBasket): IOrderToCreate{
    const deliveryMethod = this.checkoutForm?.get("deliveryForm")?.get("deliveryMethod")?.value;
    const shipToAddress = this.checkoutForm?.get("addressForm")?.value;

    if(!deliveryMethod || !shipToAddress){
      throw new Error("Problem with basket");
    }
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethod,
      shipToAddress: shipToAddress
    }
  }



}
