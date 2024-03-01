import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { map, of } from 'rxjs';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppService {

  baseUrl = "https://localhost:7017/api/";
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  shopParams = new ShopParams();


  constructor(private http: HttpClient) { }

  getProducts(useCached: boolean){

    if(useCached == false){
      this.products = [];
    }

    if(this.products.length > 0 && useCached === true){
      return of(this.products);
    }

    let params = new HttpParams();

    if(this.shopParams.brandId !==0){
      params = params.append("brandId",this.shopParams.brandId.toString());
     }

    if(this.shopParams.typeId !==0){
      params = params.append("typeId",this.shopParams.typeId.toString());
    }

    if(this.shopParams.search){
      params = params.append("search", this.shopParams.search);
    }

    params = params.append("sort", this.shopParams.sort)

    return this.http.get<any>(this.baseUrl + "products", {observe: "response", params})
    .pipe(
      map(response => {
        this.products = [...this.products, ...response.body];
        return response.body;
      })
    )
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number){
    const product = this.products.find(p => p.id ===   id);

    if(product) {
      return of(product);
    }
    return this.http.get<IProduct>(this.baseUrl + "products/"+id);
  }

  getBrands(){
    if(this.brands.length > 0) {
      return of(this.brands);
    }
    return this.http.get<IBrand[]>(this.baseUrl + "products/brands")
    .pipe(
      map(response=> {
        this.brands = response;
        return response;
      })
    )
  }

  getTypes(){
    if(this.types.length > 0) {
      return of(this.types);
    }
    return this.http.get<IType[]>(this.baseUrl + "products/types")
    .pipe(
      map(response=> {
        this.types = response;
        return response;
      })
    )

  }
}
