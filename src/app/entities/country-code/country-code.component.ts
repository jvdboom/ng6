import { Component, OnInit } from "@angular/core";
import { DBStandardService } from "src/app/services/db-standard.service";
import { Observable } from "rxjs";
import { CountryCode } from "src/app/models/country-code";

@Component({
  selector: "app-country-code",
  templateUrl: "./country-code.component.html",
  styleUrls: ["./country-code.component.css"]
})
export class CountryCodeComponent implements OnInit {

  countryCodes$: Observable<CountryCode[]> = undefined;
  selectedCountryCode: CountryCode;
  public rows = 10;
  public cols: any[];

  constructor(private dbStandardService: DBStandardService) {
    this.cols = [];
    this.cols = [
      { field: "ID", header: "ID" },
      { field: "Name", header: "Country" },
      { field: "Alpha2", header: "Alpha2" },
      { field: "Alpha3", header: "Alpha3" },
      { field: "Nbr", header: "Nbr" },
      { field: "Active", header: "Active" }
    ];

  }

  ngOnInit() {
    this.countryCodes$ = this.dbStandardService.getRows("CountryCode");
  }

  handleClick(aEvent: any) {
    console.log(JSON.stringify(this.countryCodes$));
  }

  onRowSelect(event) {
    console.log(`onRowSelect`, JSON.stringify(event));
    // this.messageService.add({severity:'info', summary:'Car Selected', detail:'Vin: ' + event.data.vin});
  }

  onRowUnselect(event) {
    console.log(`onRowUnselect`, JSON.stringify(event));
    // this.messageService.add({severity:'info', summary:'Car Unselected', detail:'Vin: ' + event.data.vin});
  }


  onRowExpand(aEvent: any) {
    console.log(`onRowExpand`, JSON.stringify(aEvent));
  }


  onPage(aEvent: any) {
    console.log(`onPage`, JSON.stringify(aEvent));
  }


  save() {
    console.log(`save()`);
  }

  onSort() {
    console.log(`onSort()`);
  }


  paginate(aEvent: any) {
    console.log(`paginate`, JSON.stringify(aEvent));
  }
}
