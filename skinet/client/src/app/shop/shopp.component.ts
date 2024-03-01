import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoppService } from './shopp.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shopp',
  templateUrl: './shopp.component.html',
  styleUrl: './shopp.component.scss'
})
export class ShoppComponent implements OnInit{
  @ViewChild('search',{static: false}) searchTerm: ElementRef | undefined;
  products: any;
  brands:  IBrand[];
  types: IType[];
  shopParams: ShopParams;
  sortOptions = [
    {name: "Alphabetical", value: "name"},
    {name: "Price Low To High", value: "priceAsc"},
    {name: "Price High To Low", value: "priceDesc"}
  ]
;
  constructor(private shoppService: ShoppService){
    this.shopParams = this.shoppService.getShopParams();

    this.brands = [];
    this.types = [];
  }

  ngOnInit(){
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
    }

    getProducts(useCached = false){
      this.shoppService.getProducts(useCached)
      .subscribe(response =>{
        this.products = response
      },error =>{
        console.log(error);
      })
    }

    getBrands(){
      this.shoppService.getBrands().subscribe(response =>{
        this.brands = [{id: 0, name: "All"}, ...response];
      },error =>{
        console.log(error);
      })
    }

    getTypes(){
      this.shoppService.getTypes().subscribe(response =>{
        this.types = [{id: 0, name: "All"}, ...response];
      },error =>{
        console.log(error);
      })
    }

    onBrandSelected(brandId: number){
      const params = this.shoppService.getShopParams();
      params.brandId = brandId;
      this.shoppService.setShopParams(params);
      this.getProducts();
    }

    onTypeSelected(typeId: number){
      const params = this.shoppService.getShopParams();
      params.typeId = typeId;
      this.shoppService.setShopParams(params);
      this.getProducts();
    }

    onSortSelected(sort: string){
      const params = this.shoppService.getShopParams();
      params.sort = sort;
      this.shoppService.setShopParams(params);
      this.getProducts();
    }

    onSearch(){
      const params = this.shoppService.getShopParams();
      params.search = this.searchTerm?.nativeElement.value;
      this.shoppService.setShopParams(params);
      this.getProducts();
    }

    onReset(){
      if(this.searchTerm && this.searchTerm.nativeElement){
      this.searchTerm.nativeElement.value = '';
      }
      this.shopParams = new ShopParams();
      this.shoppService.setShopParams(this.shopParams);
      this.getProducts();
    }
}
