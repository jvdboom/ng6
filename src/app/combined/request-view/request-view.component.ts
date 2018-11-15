import { Component, OnInit } from "@angular/core";
import { DBStandardService } from "src/app/services/db-standard.service";
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { RequestsView, Request as MyRequest } from "src/app/models/request-view";
import { Message } from "primeng/api";

@Component({
  selector: "app-request-view",
  templateUrl: "./request-view.component.html",
  styleUrls: ["./request-view.component.css"]
})
export class RequestViewComponent implements OnInit {
  public requestsViews$: Observable<RequestsView[]>;
  loading: boolean;
  requestsSource: any[];
  total: any;
constructor(private dbStandardService: DBStandardService) { }
  ngOnInit() {
    // @first int, 
    // @rows int,
    // @sortField varchar(25),
    // @sortOrder int,
    // @tenantID int,
    // @currentStateID int,
    // @dtap char

    // this.loadDataTableSource(JSON.stringify({
    //   "param1": "0", "param2": "1000", "param3": "ID",
    //   "param4": "-1", "param5": "0", "param6": "0", "param7": ""
    // }));
    // const params: HttpParams = new HttpParams()
    //   .set("param1", "0")
    //   .set("param2", "1000")
    //   .set("param3", "ID")
    //   .set("param4", "-1")
    //   .set("param5", "-0")
    //   .set("param6", "0")
    //   .set("param7", "");
  }

  loadDataTableSource(aParams: string) {
    this.loading = true;
    this.requestsSource = [];
    this.dbStandardService.getStoredProcedureS<MyRequest[]>("GetRequests", aParams)
      .subscribe(requests => {
        this.total = requests[0]["Total"];
        this.requestsSource = requests;
        // this.onLazyLoad1(this.lastLazyLoadEvent);
        this.loading = false;
      });
  }
}

