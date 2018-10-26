import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { RequestsView } from "src/app/models/request-view";
import { DBStandardService } from "src/app/services/db-standard.service";
import { HttpParams } from "@angular/common/http";
import { LazyLoadEvent } from "primeng/api";

@Component({
  selector: "app-request-view",
  templateUrl: "./request-view.component.html",
  styleUrls: ["./request-view.component.css"]
})
export class RequestViewComponent implements OnInit {
  public requestsViews$: Observable<RequestsView[]>;
  datasource: RequestsView[];
  requests: RequestsView[];

  loading: boolean;
  totalRecords: number;

  constructor(private dbStandardService: DBStandardService) { }

  ngOnInit() {


    const params = new HttpParams()
      .set("param1", "0")
      .set("param2", "10000")
      .set("param3", "-1")
      .set("param4", "0")
      .set("param5", "0")
      .set("param6", "");

    // this.requestsViews$ = this.dbStandardService.getRowsStoredProcedure("GetRequestsViewForTenant", params);
    // this.dbStandardService.getRowsStoredProcedure("GetRequestsViewForTenant", params)
    //   .subscribe(requests => {
    //     this.datasource = requests;
    //     this.totalRecords = this.datasource.length;
    //   });

  }

  handleClick(aEvent: any) {
    console.log(JSON.stringify(this.requestsViews$));
  }



  init() {
    const params = new HttpParams()
      .set("param1", "0")
      .set("param2", "10")
      .set("param3", "-1")
      .set("param4", "0")
      .set("param5", "");

    this.requestsViews$ = this.dbStandardService.getRowsStoredProcedure("GetRequestsViewForTenant", params);
  }


  loadLazy(event: LazyLoadEvent) {
    this.loading = true;

    // in a real application, make a remote request to load data using state metadata from event
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort with
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    // filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    // imitate db connection over a network
    setTimeout(() => {
      if (this.datasource) {
        this.requests = this.datasource.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }

}
