import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject, map, of } from 'rxjs';
import { IUser } from '../shared/models/user';
import { Router } from '@angular/router';
import { off } from 'process';
import { IAddress } from '../shared/models/address';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  BaseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient, private router: Router) { }


  loadCurrentUser(token: string){
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${token}`);

    return this.http.get<IUser | null>(this.BaseUrl + "account", {headers}).pipe(
      map((user: IUser | null)=>{
        if(user) {
          localStorage.setItem("token", user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  login(value: any)
  {
    return this.http.post<IUser>(this.BaseUrl + "account/login", value).pipe(
      map((user: IUser) => {
        if(user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values: any)
  {
    return this.http.post<any>(this.BaseUrl + "account/register",values).pipe(
      map((user: IUser)=>{
        if(user) {
          localStorage.setItem("token", user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem("token");
    this.currentUserSource.next(null);
    this.router.navigateByUrl("/");
  }

  checkEmailExists(email: string) {
    return this.http.get(this.BaseUrl + "account/emailexists?email=" + email);
  }

  getUserAddress(){
    return this.http.get<IAddress>(this.BaseUrl + "account/address");
  }

  updateUserAddress(address:IAddress){
    return this.http.put<IAddress>(this.BaseUrl + "account/address", address);
  }
}
