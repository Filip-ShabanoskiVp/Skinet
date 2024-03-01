import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const toket = localStorage.getItem("token");

    if(toket){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${toket}`
        }
      })
    }
    return next.handle(req);
  }

}
