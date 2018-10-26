import { Injectable, Injector } from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
// import { of } from "rxjs/observable/of"
// import "rxjs/add/operator/do";
import { environment } from "src/environments/environment";
// import { Observable } from "rxjs";
// import { throwError  } from "rxjs";
import { Observable, throwError, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from "rxjs";
import { catchError, tap, map, filter, scan } from "rxjs/operators";
// import { webSocket } from 'rxjs/webSocket';
// import { ajax } from 'rxjs/ajax';
// import { TestScheduler } from 'rxjs/testing';

@Injectable({
  providedIn: "root"
})
export class DBStandardService {
  [x: string]: any;

  private dbStandardUrl = `${environment.baseUrl}dbstandard/`;
  private storedProcedureUrl = `${environment.baseUrl}dbstoredprocedure/`;

  constructor(private http: HttpClient, private router: Router, private injector: Injector) { }

  earthQuakeCount(): Observable<any> {
    return this.http.get<any>(`https://earthquake.usgs.gov/fdsnws/event/1/count?format=geojson`);
    // .pipe(
    //   map(data =>
    //     data["count"]
    //   )
    // );
  }

  earthQuakeQuery<T>(limit = 10, offset = 1, orderby = "time"): Observable<T> {
    let url = `https://earthquake.usgs.gov/fdsnws/event/1/query'?format=geojson&starttime=2017-07-01&endtime=2017-07-31`;
    url += `&orderby=${orderby}&limit=${limit}&offset=${offset}`;
    return this.http.get<T>(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02`)
      .pipe(map(
        data => data["features"].map(feature => feature["properties"])
      ));
  }



  getJSONRows<T>(aTableName: string): Observable<T> {
    if (aTableName) {
      return this.http
        .get<T>(`https://jsonplaceholder.typicode.com/${aTableName}`)
        .pipe(
          tap(e => {
            console.log(`getJSONRows`, e);
          }),
          catchError(err => throwError(new Error("getJSONRows"))),
        // catchError(this.handleError("getJSONRows", " TODO: "))
      );
    } else {
      return new Observable<T>();
    }
  }

  private log(message: string) {
    this.messageService.add(`DBStandardService: ${message}`);
  }

  // private handleError<T>(operation = "operation", result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

  getStoredProcedure<T>(aStoredProcedure: string, aParams: HttpParams): Observable<T> {
    if (aStoredProcedure) {
      return this.http
        .get<T>(`${this.storedProcedureUrl}[${aStoredProcedure}]`, { params: aParams })
        .pipe(
          tap(result => {
            if (result["Key"] === "Error") {
              this.router.navigate(["/login"]);
              return new Observable<T>();
            }
          }),
        // catchError(this.handleError("getStoredProcedure<T>", " TODO: "))
      );
    } else {
      return new Observable<T>();
    }
  }


  getRows<T>(aTableName: string, aFilter: string = ""): Observable<T> {
    if (aTableName) {
      if (true) {
        // console.log(`getRows<T>("${aTableName}"${aFilter === "" ? ")" : `, "${aFilter}")`}`);
      }
      const params = new HttpParams({ fromString: aFilter });
      return this.http
        .get<T>(`${this.dbStandardUrl}[${aTableName}]`, { params: params })
        .pipe(
          tap(result => {
            // console.log(`getRows<T>(${aTableName})=>`, result);
            if (result["Key"] === "Error") {
              return new Observable<T>();
            } else {

            }
          }),
        // catchError(this.handleError("getRows", " TODO: "))
      );
    } else {
      return new Observable<T>();
    }
  }


  getRowsObsolete(aTableName: string, aFilter: string = ""): Observable<any[]> {
    if (aTableName) {
      if (true) {
        // console.log(`getRows("${aTableName}"${aFilter === "" ? ")" : `, "${aFilter}")`}`);
      }
      const params = new HttpParams({ fromString: aFilter });
      return this.http
        .get<any[]>(`${this.dbStandardUrl}[${aTableName}]`, { params: params })
        .pipe(
          tap(result => {
            if (result["Key"] === "Error") {
              return new Observable<any[]>();
            } else {

            }
          }),
          catchError(err => throwError(new Error("getRowsObsolete"))),
        // catchError(this.handleError("getRows", []))
      );
      // .cath(error => {
      //   console.error("error catched", error);
      //   return Observable.of({description: "Error Value Emitted"});
      // });
      // .pipe(shareReplay(),
      //   tap(res => {
      //     if (res && res[0] === "Error") {
      //       console.log("1", res[0]);
      //       return res;
      //     } else {
      //       console.log("2", res["Key"]);
      //       return res;
      //     }
      //   }));

      // .catch(err => Observable.of("I", "II", "III", "IV", "V").pipe(map(x => x + "!!!")));
      // of(1, 2, 3).pipe(map(x => x + "!!!"));
    } else {
      return new Observable<any[]>();
    }
  }


  getRowsStoredProcedure<T>(aStoredProcedureName: string, aParams: HttpParams): Observable<T> {
    try {
      return this.http
        .get<T>(`${this.storedProcedureUrl}[${aStoredProcedureName}]`, { params: aParams })
        .pipe(
          tap(result => {
            // console.log(`getRowsStoredProcedure<T>(${aStoredProcedureName})=>`, result);
            if (result["Key"] === "Error") {
              return new Observable<T>();
            } else {

            }
          }),
          catchError(err => throwError(new Error("getRowsStoredProcedure"))),
        // catchError(this.handleError("getRows", "")),
      );
    } catch (error) {
      return new Observable<T>();
    }
  }



  public handleError(error: any, mes: any): Observable<any> {
    return Observable.throw(`BadInput: ${error}`);
  }



  public handleErrorOld(aHttpErrorResponse: HttpErrorResponse | any): Observable<any> {
    const errorMsg = aHttpErrorResponse.message || "Error: Unable to complete request.";
    // TODO: Check for more instaceof
    // and make ajustable error handling via configuration
    // like an page for error 400
    if (aHttpErrorResponse.status === 400) {
      /** TODO: Change for correct errorhandling */
      return Observable.throw(`BadInput: ${errorMsg}`);
    }

    if (aHttpErrorResponse.status === 401) {
      this.router.navigate([`/login`]);
      // const authService = this.injector.get(AuthService);
      // /** TODO: Change for correct errorhandling */
      // authService.logout()
      //   .subscribe(simpleResult => {
      //     this.router.navigate([`/login`]);
      //   }, error => {
      //     /** Already logged out in other Tab */
      //     this.router.navigate([`/login`]);
      //   });
      // this.router.navigate([`/login`]);
      return Observable.throw(`Unauthorized: ${errorMsg}`);
    }

    if (aHttpErrorResponse.status === 404) {
      /** TODO: Change for correct errorhandling */
      return Observable.throw(`NotFoundError: ${errorMsg}`);
    }

    // an other page for 500 etc....
    // make some logging
    let errorMessage = "";
    if (aHttpErrorResponse && aHttpErrorResponse.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${aHttpErrorResponse.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server status code: ${aHttpErrorResponse.status},
                      Server status text: ${aHttpErrorResponse.statusText},
                      error message is:   ${aHttpErrorResponse.message}`;
    }

    // TODO: Use this error informetion for redirect and logging
    return Observable.throw(new Observable<any>());
  }


}

