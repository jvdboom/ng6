import { Component, OnInit } from "@angular/core";
import { DBStandardService } from "src/app/services/db-standard.service";
import { Observable } from "rxjs/internal/Observable";
import { Tenant } from "src/app/models/tenant";
import { LazyLoadEvent } from "primeng/api";

import { map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-tenant",
  templateUrl: "./tenant.component.html",
  styleUrls: ["./tenant.component.css"]
})
export class TenantComponent implements OnInit {
  public tenants$: Observable<Tenant[]> = undefined;
  public tenants: Tenant[] = [];
  public totalRows = 0;

  constructor(private dbStandardService: DBStandardService) { }
  cols: any[];

  ngOnInit() {
    this.cols = [
      { field: "Name", header: "Name" }
    ];

    this.dbStandardService.getRows<Tenant[]>(`Tenant`)
      .subscribe(tenants => {
        this.totalRows = tenants.length;
        this.tenants = tenants;
      });

    // this.dbStandardService.getRows<Tenant[]>(`Tenant`)
    //   .map(tenants => {
    //     this.totalRows = tenants.length;
    //     this.tenants$ = tenants;
    //   });

    // this.dbStandardService.getRows("Tenant")
    //   .subscribe(tenants => {
    //     this.tenants$ = tenants.asObservable();
    //   });
    // shareReplay(),
    // tap((simpleresult: SimpleResult) => {
    //   console.log(`@@@001`, simpleresult);
    //   console.log(`simpleresult.Value.split(";")[0]`, simpleresult.Value.split(";")[0]);
    //   localStorage.setItem("currentuser", simpleresult.Value.split(";")[0]);
    //   return simpleresult;
    // })


  }

  onLazyLoad(aLazyLoadEvent: LazyLoadEvent) {
    console.log(`onLazyLoad`, aLazyLoadEvent);
  }

}
