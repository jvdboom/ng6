import { Component, OnInit } from "@angular/core";
import { DBStandardService } from "src/app/services/db-standard.service";
import { HttpParams } from "@angular/common/http";
import { LazyLoadEvent } from "primeng/api";

@Component({
  selector: "app-history-bigger",
  templateUrl: "./history-bigger.component.html",
  styleUrls: ["./history-bigger.component.css"]
})
export class HistoryBiggerComponent implements OnInit {
  public cols: any[];
  public historiesPaged: History[];
  public historiesVisible: History[];
  public loading = true;
  public totalRecords = 10;
  public lazyLoadEvent: LazyLoadEvent;



  constructor(private dbStandardService: DBStandardService) { }

  ngOnInit() {
    this.cols = [
      { field: "ID", header: "ID" },
      { field: "TableName", header: "TableName" }
    ];

    // this.getHistoryPage(this.totalRecords);
  }


  private getHistoryPage(aNumberOfRows: number) {
    const params: HttpParams = new HttpParams()
      .set("param1", "0", )
      .set("param2", aNumberOfRows.toString())
      .set("param3", "TableName")
      .set("param4", "1");
    this.dbStandardService.getStoredProcedure<History[]>(`GetHistory`, params)
      .subscribe(histories => {
        this.historiesPaged = histories;
      },
        error => {
          console.log(`error`, error);
        },
        () => {
          console.log(`Complete`);
          this.loading = false;
        });
  }

  onLazyLoad(aLazyLoadEvent: LazyLoadEvent) {
    console.log(aLazyLoadEvent);
    // while (this.loading && this.historiesPage === undefined) {
    //   // console.log(`a`);
    // }




  }

}
