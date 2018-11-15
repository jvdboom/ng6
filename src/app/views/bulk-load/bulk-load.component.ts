import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { Request as MyRequest } from "src/app/models/request-view";
import { DBStandardService } from "src/app/services/db-standard.service";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-bulk-load",
  templateUrl: "./bulk-load.component.html",
  styleUrls: ["./bulk-load.component.css"]
})
export class BulkLoadComponent implements OnInit {

  public requests$: Observable<MyRequest[]>;
  public requests: MyRequest[];
  public total: 0;

  constructor(private dbStandardService: DBStandardService) { }
  // @first int, 
  // @rows int,
  // @sortField varchar(25),
  // @sortOrder int,
  // @tenantID int,
  // @currentStateID int,
  // @dtap char

  //    this.loadDataTableSource(JSON.stringify({
  //   //   "param1": "0", "param2": "1000", "param3": "ID",
  //   //   "param4": "-1", "param5": "0", "param6": "0", "param7": ""
  //   // }));
  //  }

  ngOnInit() {
    const paramsS = [{
      "param1": "0", "param2": "1000", "param3": "ID",
      "param4": "-1", "param5": "0", "param6": "0", "param7": ""
    }];
    const params: HttpParams = new HttpParams()
      .set("param1", "0")
      .set("param2", "1000")
      .set("param3", "ID")
      .set("param4", "-1")
      .set("param5", "0")
      .set("param6", "0")
      .set("param7", "");
    this.requests = [];
    this.requests$ = this.dbStandardService.getStoredProcedure<MyRequest[]>("GetRequests", params);

  }

  loadDataTableSource(aStoredProcedureName: string, aParams: HttpParams) {
    // this.dbStandardService.getStoredProcedure(aStoredProcedureName, aParams)
    //   .subscribe(results => {
    //     this.total = results[0]["Total"];
    //     this.requests = results;
    //   });
  }

}
