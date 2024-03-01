import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { IAddress } from '../../shared/models/address';
@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss'
})
export class CheckoutAddressComponent implements OnInit{
  @Input() checkoutForm?: FormGroup;

  constructor(private accountService: AccountService, private toastr: ToastrService){}

  ngOnInit(): void {
  }

  saveUserAddress(){
    this.accountService.updateUserAddress(this.checkoutForm?.get('addressForm')?.value)
    .subscribe((address: IAddress)=> {
      this.toastr.success("Address saved");
      this.checkoutForm?.get('addressForm')?.reset(address);
    },error=>{
      this.toastr.error(error.message);
      console.log(error);
    })
  }

}