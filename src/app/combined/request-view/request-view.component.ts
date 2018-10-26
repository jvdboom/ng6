import { Component, OnInit } from "@angular/core";
import { DBStandardService } from "src/app/services/db-standard.service";
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { RequestsView } from "src/app/models/request-view";
import { Message } from "primeng/api";

@Component({
  selector: "app-request-view",
  templateUrl: "./request-view.component.html",
  styleUrls: ["./request-view.component.css"]
})
export class RequestViewComponent implements OnInit {
  public requestsViews$: Observable<RequestsView[]>;

  constructor(private dbStandardService: DBStandardService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    const params = new HttpParams()
      .set("param1", "0")
      .set("param2", "10")
      .set("param3", "-1")
      .set("param4", "0")
      .set("param5", "");

    // this.requestsViews$ = this.dbStandardService.getRowsStoredProcedure("GetRequestsViewForTenant", params)
    //   .map((a) => console.log(`a@@@`, a),
    //     (b) => console.log(`b@@@`, b), 
    //     (c) => console.log(`c@@@`, c))
    //   .catch((e) => { console.log(`@@@`, e); });

  }

}
