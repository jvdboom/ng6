import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DBStandardService } from "src/app/services/db-standard.service";
import { Observable } from "rxjs";
import { SimpleResult } from "src/app/models/simple-result";
import { MessageService, LazyLoadEvent } from "primeng/api";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-demo",
  templateUrl: "./demo.component.html",
  styleUrls: ["./demo.component.css"]
})
export class DemoComponent implements OnInit, AfterViewInit {
  public cols: any[];
  public totalRecords = 0;
  public histories: History[];
  first = 0;
  limit = 10;
  lastSortOrder = -1;
  lastSortField = "ID";
  loading = true;
  historiesSource: any[];
  sourceLenght = 50;
  lastLazyLoadEvent: LazyLoadEvent;
  page: any;
  private lastFirst: number = 0;


  constructor(private dbStandardService: DBStandardService,
    private messageService: MessageService) {
    const initialParams: HttpParams = new HttpParams()
      .set("param1", "0", )
      .set("param2", this.sourceLenght.toString())
      .set("param3", this.lastSortField)
      .set("param4", this.lastSortOrder.toString());

    this.dbStandardService.getStoredProcedure<SimpleResult[]>(`GetHistoryCount`, undefined)
      .subscribe(simpleResults => {
        this.totalRecords = 0;
        if (simpleResults[0]) {
          this.totalRecords = +simpleResults[0].Value;
          this.loadTableSource(initialParams);
        }
      },
        error => {
          this.messageService.add({ severity: "error", summary: `GetHistoryCount`, detail: error });
        });


    this.cols = [
      { field: "ID", header: "ID" },
      { field: "TableName", header: "TableName" },
      { field: "CreationDateTime", header: "Created" }
    ];
  }

  ngOnInit() {
  }

  loadTableSource(aParams: HttpParams) {
    this.loading = true;
    this.historiesSource = [];
    this.dbStandardService.getStoredProcedure<History[]>("GetHistory", aParams)
      .subscribe(histories => {
        this.historiesSource = histories;
        this.onLazyLoad(this.lastLazyLoadEvent);
        this.loading = false;
      });

  }

  ngAfterViewInit(): void {
    console.log(`ngAfterViewInit`);
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
  }

  onLazyLoad(aLazyLoadEvent: LazyLoadEvent) {
    console.log(`onLazyLoad`, aLazyLoadEvent);
    if (aLazyLoadEvent === undefined) {
      return;
    } else {
      if (aLazyLoadEvent.first >= this.sourceLenght) {
        this.lastFirst = aLazyLoadEvent.first;
        const initialParams: HttpParams = new HttpParams()
          .set("param1", aLazyLoadEvent.first.toString())
          .set("param2", this.sourceLenght.toString())
          .set("param3", this.lastSortField)
          .set("param4", this.lastSortOrder.toString());
        this.loadTableSource(initialParams);
        return;
      }

      this.lastLazyLoadEvent = aLazyLoadEvent;
      this.lastSortField = aLazyLoadEvent.sortField;
      this.lastSortOrder = aLazyLoadEvent.sortOrder;
      if (this.totalRecords > 0 && this.lastLazyLoadEvent !== undefined && this.historiesSource.length > 0) {
        this.first = this.lastLazyLoadEvent.first;
        this.histories = this.historiesSource
          .slice(this.lastLazyLoadEvent.first, this.lastLazyLoadEvent.first + this.lastLazyLoadEvent.rows);
      }
    }
  }

  paginate(aEvent) {
    this.page = (aEvent["first"] / aEvent["rows"]) + 1;
    this.onLazyLoad({ "first": aEvent["first"], "rows": aEvent["rows"], "sortField": this.lastSortField, "sortOrder": this.lastSortOrder });
  }

}
