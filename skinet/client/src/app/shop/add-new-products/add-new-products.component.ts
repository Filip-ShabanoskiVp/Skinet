import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBrand } from '../../shared/models/brand';
import { IType } from '../../shared/models/productType';
import { ShoppService } from '../shopp.service';
import { error } from 'console';
import { ShopParams } from '../../shared/models/shopParams';
import { IProductToCreate } from '../../shared/models/product';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-products',
  templateUrl: './add-new-products.component.html',
  styleUrl: './add-new-products.component.scss'
})
export class AddNewProductsComponent implements OnInit{

  productsForm!: FormGroup;
  brands!: IBrand[];
  types!: IType[];
  shopParams: ShopParams;

  constructor(private fb: FormBuilder, private shopService: ShoppService,
    private toastr: ToastrService, private router: Router){
        this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getBrands();
    this.getTypes();
    this.createNewProductForm();
  }

  getBrands(){
    this.shopService.getBrands().subscribe(response =>{
      this.brands = [...response];
    },error =>{
      console.log(error)
    })
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response =>{
      this.types = [...response];
    },error =>{
      console.log(error)
    })
  }

  createNewProductForm(){
    this.productsForm = this.fb.group({
      name:[null, [Validators.required]],
      description:[null, [Validators.required]],
      price:[null, [Validators.required,Validators.pattern('^[0-9]*$')]],
      pictureUrl:[null,[Validators.required]],
      productTypeId:[ null,[Validators.required,Validators.pattern('^[0-9]*$')]],
      productBrandId:[null,[Validators.required,Validators.pattern('^[0-9]*$')]],
    });
  }

  SaveProduct()
  {
    console.log(this.productsForm?.value)

      this.shopService.newProduct(this.productsForm?.value)
      .subscribe((product: IProductToCreate)=>{
        this.toastr.success("Product saved");
        this.router.navigate(["shop"]);
      },error=>{
        this.toastr.error(error.message);
        console.log(error);
      })
  }

}
