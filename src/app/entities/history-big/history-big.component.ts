import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { DBStandardService } from "src/app/services/db-standard.service";
import { LazyLoadEvent } from "primeng/components/common/lazyloadevent";
import { SimpleResult } from "src/app/models/simple-result";
import { HttpParams } from "@angular/common/http";
import { JSONP_HOME } from "@angular/http/src/backends/browser_jsonp";
import { subscribeOn, shareReplay, tap } from "rxjs/operators";
import { JSONP_ERR_NO_CALLBACK } from "@angular/common/http/src/jsonp";
import { MessageService } from "primeng/api";
import { Table } from "primeng/table";

@Component({
  selector: "app-history-big",
  templateUrl: "./history-big.component.html",
  styleUrls: ["./history-big.component.css"]
})
export class HistoryBigComponent implements OnInit {
  // @ViewChild('dt') dataTable: DataTable;
  @ViewChild("dt") dt: Table;
  // @ViewChild("dt") tt: TurboTable;
  public allHistories$: Observable<History[]> = undefined;
  public historiesSource: History[];
  public histories: History[];
  public histories$: Observable<History[]> = undefined;
  public cols: any[];

  public limit: number = 1000;
  public rowLimit: number = 10;
  public totalRecords: number;

  private lastLazyLoadEvent: LazyLoadEvent;
  private lastSortOrder: number = 1;
  private lastSortField: string = undefined;
  private lastFirst: number = 0;
  public first: number = 0;
  loading: boolean;

  public totalRecords$: Observable<SimpleResult>;

  constructor(private dbStandardService: DBStandardService, private messageService: MessageService) {
    const initialParams: HttpParams = new HttpParams()
      .set("param1", "0", )
      .set("param2", "1000")
      .set("param3", "ID")
      .set("param4", this.lastSortOrder.toString());
    this.loadhistoriesSource(initialParams);


    this.dbStandardService.getStoredProcedure<SimpleResult[]>(`GetHistoryCount`, undefined)
      .subscribe(simpleResults => {
        this.totalRecords = +simpleResults[0].Value;
      });

    this.cols = [
      { field: "ID", header: "ID" },
      { field: "TableName", header: "TableName" },
      { field: "CreationDateTime", header: "Created" }
    ];
  }

  loadhistoriesSource(aParams: HttpParams) {
    this.loading = true;
    this.historiesSource = [];
    this.dbStandardService.getStoredProcedure<History[]>("GetHistory", aParams)
      .subscribe(histories => {
        this.historiesSource = histories;
        this.onLazyLoad(this.lastLazyLoadEvent);
        this.loading = false;
      });

  }


  ngOnInit() { }

  getSlice() {

  }

  reset(event: any) {
    console.log(event);
  }

  onPageChange(aPage: Page) {
    console.log(aPage);
    this.onLazyLoad({ "first": aPage.first, "rows": aPage.rows, "sortField": this.lastSortField, "sortOrder": this.lastSortOrder });
    // console.log(aPage);
    // this.first = aPage.first;
    // this.lastLazyLoadEvent.first = aPage.first;
    // this.dt.first = 100;
    // this.lastLazyLoadEvent.rows = aPage.rows;
    // this.onLazyLoad({ "first": 100 });
    // this.dt.first = 100;
    // const gg: any = 100;
  }

  /**
   * @param aLazyLoadEvent give limit, offset and order for the storedprocedure
   */
  onLazyLoad(aLazyLoadEvent: LazyLoadEvent) {
    if (aLazyLoadEvent === undefined) {
      return;
    } else {
      if (aLazyLoadEvent.first > this.lastFirst + 1000) {
        this.lastFirst = aLazyLoadEvent.first;
        const initialParams: HttpParams = new HttpParams()
          .set("param1", this.lastFirst.toString())
          .set("param2", "1000")
          .set("param3", this.lastSortField)
          .set("param4", this.lastSortOrder.toString());
        this.loadhistoriesSource(initialParams);
        return;
      }
      if ((this.lastSortField !== aLazyLoadEvent.sortField) || (this.lastSortOrder !== aLazyLoadEvent.sortOrder)) {
        this.messageService.add({ severity: "info", summary: "ORDER", detail: "CHANGED" });
        const initialParams: HttpParams = new HttpParams()
          .set("param1", this.lastFirst.toString())
          .set("param2", "1000")
          .set("param3", this.lastSortField)
          .set("param4", this.lastSortOrder.toString());
        this.loadhistoriesSource(initialParams);
        return;
      }
      this.lastLazyLoadEvent = aLazyLoadEvent;
      this.lastSortField = aLazyLoadEvent.sortField;
      this.lastSortOrder = aLazyLoadEvent.sortOrder;
      this.lastLazyLoadEvent.first = this.lastLazyLoadEvent.first === undefined ? 0 : this.lastLazyLoadEvent.first;
      // this.lastLazyLoadEvent.first = 43481;
      if (this.totalRecords > 0 && this.lastLazyLoadEvent !== undefined && this.historiesSource.length > 0) {
        this.first = this.lastLazyLoadEvent.first;
        this.histories = this.historiesSource
          .slice(this.lastLazyLoadEvent.first, this.lastLazyLoadEvent.first + this.lastLazyLoadEvent.rows);
        this.totalRecords = this.histories.length;
      }
    }

  }

}

class Page {
  page: number;
  first: number;
  rows: number;
  pageCount: number;
}


    // setTimeout(() => {
    //   if (this.allHistories$) {
    //     console.log(this.allHistories$.slice(aLazyLoadEvent.first, (aLazyLoadEvent.first + aLazyLoadEvent.rows)));
    //     this.histories = this.allHistories.slice(aLazyLoadEvent.first, (aLazyLoadEvent.first + aLazyLoadEvent.rows));
    //   }
    // }, 5000);
