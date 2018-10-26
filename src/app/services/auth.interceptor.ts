import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService) { }

  intercept(aRequest: HttpRequest<any>, aNext: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`AuthInterceptor`, aRequest);
    console.log(localStorage.getItem("currentuser"));

    // const cloneRequest = aRequest.clone({ headers: aRequest.headers.append("", "") });
    if (localStorage.getItem("currentuser")) {
      const cloneRequest = aRequest.clone({
        headers: aRequest.headers
          .set("X-AUTH-TOKEN", localStorage.getItem("currentuser"))
      });
      return aNext.handle(cloneRequest);
    } else {
      return aNext.handle(aRequest);
    }
  }

}
