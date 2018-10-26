import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DBStandardService } from "src/app/services/db-standard.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-demo",
  templateUrl: "./demo.component.html",
  styleUrls: ["./demo.component.css"]
})
export class DemoComponent implements OnInit, AfterViewInit {


  constructor(private dbStandardService: DBStandardService) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    console.log(`ngAfterViewInit`);
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.

  }

}
