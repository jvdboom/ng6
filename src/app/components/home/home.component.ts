import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  clicks: number = 0;

  constructor() { }

  ngOnInit() {
  }


  count() {
    this.clicks++;
  }

}
