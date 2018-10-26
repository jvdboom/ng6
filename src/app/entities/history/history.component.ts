import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { DBStandardService } from "src/app/services/db-standard.service";
import { LazyLoadEvent } from "primeng/components/common/lazyloadevent";
import { SimpleResult } from "src/app/models/simple-result";
import { HttpParams } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { JSONP_HOME } from "@angular/http/src/backends/browser_jsonp";
import { map } from "rxjs/operators";
import { Table } from "primeng/table";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"]
})
export class HistoryComponent implements OnInit, AfterViewInit {
  @ViewChild("dt") dataTable: Table;

  public allHistories$: Observable<History[]> = undefined;
  public historiesSource: History[];
  public histories: History[];
  public histories$: Observable<History[]> = undefined;
  public cols: any[];
  public limit: number = 10;
  public totalRecords: number;
  public totalRecords$: Observable<SimpleResult>;
  private counter: number = 1;
  private lastLazyLoadEvent: LazyLoadEvent;
  private lastSortOrder: number = 1;
  private lastSortField: string = undefined;
  private lastFirst: number = 0;
  public first: number = 0;
  public page: number = 1;
  loading: boolean;

  constructor(private dbStandardService: DBStandardService, private messageService: MessageService) {


    const initialParams: HttpParams = new HttpParams()
      .set("param1", "0", )
      .set("param2", "50")
      .set("param3", this.lastSortField)
      .set("param4", this.lastSortOrder.toString());
    this.loadhistoriesSource(initialParams);
    this.dbStandardService.getStoredProcedure<SimpleResult[]>(`GetHistoryCount`, undefined)
      .subscribe(simpleResults => {
        this.totalRecords = 0;
        if (simpleResults[0]) {
          this.totalRecords = +simpleResults[0].Value;
          this.onLazyLoad(this.lastLazyLoadEvent);
        }
      },
        error => {
          messageService.add({ severity: "error", summary: error, detail: error });
        });

    this.cols = [
      { field: "ID", header: "ID" },
      { field: "TableName", header: "TableName" },
      { field: "CreationDateTime", header: "Created" }
    ];
  }

  ngOnInit() {
  }

  loadhistoriesSource(aParams: HttpParams) {
    this.loading = true;
    this.historiesSource = [];
    this.dbStandardService.getStoredProcedure<History[]>("GetHistory", aParams)
      .subscribe(histories => {
        this.historiesSource = histories;
        this.onLazyLoad(this.lastLazyLoadEvent);
        this.toPage(this.page);
        this.loading = false;
      });

  }


  /**
   * @param aLazyLoadEvent give limit, offset and order for the storedprocedure
   * in a real application, make a remote request to load data using state metadata from event
   * aLazyLoadEvent.first = First row offset
   * aLazyLoadEvent.rows = Number of rows per page
   * aLazyLoadEvent.sortField = Field name to sort with
   * aLazyLoadEvent.sortOrder = Sort order as number, 1 for asc and -1 for dec
   * filters: FilterMetadata object having field as key and filter value, filter matchMode as value
   * imitate db connection over a network
   * @first int,
	   @rows int,
	   @sortField varchar(20),
	   @sortOrder int
   */
  onLazyLoad(aLazyLoadEvent: LazyLoadEvent): void {
    console.log(`${this.counter++}::onLazyLoad(${JSON.stringify(aLazyLoadEvent)})`);
    console.log(aLazyLoadEvent);
    if (aLazyLoadEvent === undefined) {
      return;
    } else {
      if (aLazyLoadEvent.first > this.lastFirst + 50) {
        this.lastFirst = aLazyLoadEvent.first;
        const initialParams: HttpParams = new HttpParams()
          .set("param1", this.lastFirst.toString())
          .set("param2", "50")
          .set("param3", this.lastSortField)
          .set("param4", this.lastSortOrder.toString());
        this.loadhistoriesSource(initialParams);
        return;
      }
      if ((this.lastSortField !== aLazyLoadEvent.sortField) || (this.lastSortOrder !== aLazyLoadEvent.sortOrder)) {
        this.messageService.add({ severity: "info", summary: "ORDER", detail: "CHANGED" });
        const initialParams: HttpParams = new HttpParams()
          .set("param1", this.lastFirst.toString())
          .set("param2", "50")
          .set("param3", this.lastSortField)
          .set("param4", this.lastSortOrder.toString());
        this.loadhistoriesSource(initialParams);
        return;
      }
      this.lastLazyLoadEvent = aLazyLoadEvent;
      this.lastSortField = aLazyLoadEvent.sortField;
      this.lastSortOrder = aLazyLoadEvent.sortOrder;
      this.lastLazyLoadEvent.first = this.lastLazyLoadEvent.first === undefined ? 0 : this.lastLazyLoadEvent.first;
      if (this.totalRecords > 0 && this.lastLazyLoadEvent !== undefined && this.historiesSource.length > 0) {
        this.first = this.lastLazyLoadEvent.first;
        this.histories = this.historiesSource
          .slice(this.lastLazyLoadEvent.first, this.lastLazyLoadEvent.first + this.lastLazyLoadEvent.rows);
        // this.toPage(this.page);
        // this.totalRecords = this.page / 10;
      }
    }
  }

  ngAfterViewInit() {
    console.log(`ngAfterViewInit`);
  }

  onPage(aEvent: any) {
    this.page = +(aEvent["first"] / aEvent["rows"]) + 1;
    console.log(`this.page: ${this.page}`);
  }

  toPage(aPage: number) {
    // this.first = aPage;
  }
}
