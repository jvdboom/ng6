import { Injectable, Injector } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
    private router: Router,
    private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(`ErrorInterceptor`, request);
    // console.log(`ErrorInterceptor`, next);
    const messageService = this.injector.get(MessageService);
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 0) { // Unknown Error
        this.authService.logout();
        this.router.navigate(["/login"]);
        // messageService.add({ severity: "error", summary: err.statusText, detail: err["error"]["Value"] });
        messageService.add({ severity: "error", summary: err.statusText, detail: err.message });
      }
      if (err.status === 401) { // Unauthorized
        this.authService.logout();
        this.router.navigate(["/login"]);
        messageService.add({ key: "tc", severity: "error", summary: err.statusText, detail: err.message });
      }
      if (err.status === 400) { // BadInput
        /** TODO: Add extra functionality for correct errorhandling */
        messageService.add({ severity: "error", summary: err.statusText, detail: err.message });
      }

      if (err.status === 404) { // NotFoundError
        /** TODO: Add extra functionality for correct errorhandling */
        messageService.add({ severity: "error", summary: err.statusText, detail: err.message });
      }
      if (err.status === 500) { // NotFoundError
        /** TODO: Add extra functionality for correct errorhandling */
        messageService.add({ severity: "error", summary: err.statusText, detail: err.message });
      }

      return throwError(err);
    }));
  }
}

