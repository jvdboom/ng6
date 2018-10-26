import { Injectable } from "@angular/core";
import { SimpleResult } from "../models/simple-result";
// , HttpParams, HttpHeaders
import { HttpClient } from "@angular/common/http";
import { shareReplay, tap } from "rxjs/operators";
import { User } from "../models/user";
import { Observable, BehaviorSubject } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

// import "rxjs/operators/tap";
// import "rxjs/operators/shareReplay";
// import { Subject } from "rxjs/Subject";
// import { Subscription } from "rxjs/Subscription";

// import "rxjs/operators/tap";
// import "rxjs/operators/shareReplay";
export const ANONYMOUS_USER: User = {
  id: undefined,
  email: undefined
};

export const DELIMITER = ",";
@Injectable({
  providedIn: "root"
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private authorizationUrl = `${this.baseUrl}ldap/`;

  private subject = new BehaviorSubject<User>(ANONYMOUS_USER);

  user$: Observable<User>;
  // isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));
  // isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));


  constructor(private http: HttpClient) { }

  public login(aUser: string, aPassword: string) {
    return this.http
      .post<SimpleResult>(`${this.authorizationUrl}login`, `{"user": "${btoa(aUser + DELIMITER + btoa(aPassword))}"}`)
      .pipe(
        shareReplay(),
        tap((simpleresult: SimpleResult) => {
          console.log(`@@@001`, simpleresult);
          console.log(`simpleresult.Value.split(";")[0]`, simpleresult.Value.split(";")[0]);
          localStorage.setItem("currentuser", simpleresult.Value.split(";")[0]);
          return simpleresult;
        })
      );
  }

  logout() {
    localStorage.removeItem("currentuser");
  }


}



// public login01(aUser: string, aPassword: string) {
//   console.log(`login01`, aUser);
//   return this.http
//     .post<SimpleResult>(`${this.authorizationUrl}login`, `{"user": "${btoa(aUser + DELIMITER + btoa(aPassword))}"}`)
//     .pipe(
//       shareReplay(),
//       tap((simpleResult: SimpleResult) => {
//         console.log(`simpleResult`, JSON.stringify(simpleResult));
//       }),
//   );

//   // .map(shareReplay(),
//   // (simpleresult: SimpleResult) => {
//   //   console.log(`001`, simpleresult);
//   // }));
// }



// login(aUser: string, aPassword: string) {
//   /** TODO: Find out about TAP and the correct usage!!! */
//   return this.http.post<SimpleResult>(`${this.authorizationUrl}login`, `{"user": "${btoa(aUser + DELIMITER + btoa(aPassword))}"}`)
//     .pipe(
//       shareReplay(),
//       tap((simpleResult: SimpleResult) => {
//         if (simpleResult.Key.toLowerCase() === "result") {
//           // this.username = aUser;
//           sessionStorage.setItem(aUser, ``);
//           // localStorage.setItem(`${this.username}`, simpleResult.Value.split(";")[0]);
//           console.log(`##001`, simpleResult.Value.split(";")[0]);
//           localStorage.setItem(`currentUser`, simpleResult.Value.split(";")[0]);
//           if (simpleResult.Value.split(":")[1]) {
//             // tslint:disable-next-line:max-line-length
// tslint:disable-next-line:max-line-length
//             const mnilliSeconds = new Date(simpleResult.Value.split(";")[1]).getTime() - (new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000);
//             // this.setSessionTimeout(mnilliSeconds);
//           }
//           // this.subject.next({ User: this.username, Token: localStorage.getItem(`${this.username}`) });
//         } else {
//           this.subject.next(ANONYMOUS_USER);
//         }
//       })
//     , );

  // tap(user => this.subject.next({ User: aUser, Token: localStorage.getItem("token") })), );
  // tap(user => this.subject.next({ User: aUser, Token: localStorage.getItem("token") })), );
