import { Component, OnInit } from "@angular/core";
import { Message, MessageService } from "primeng/api";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  msgs: Message[];

  constructor(private messageService: MessageService) { }
  ngOnInit() {
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: "success", summary: "Success Message", detail: "Order submitted" });
  }

  showInfo() {
    this.msgs = [];
    this.msgs.push({ severity: "info", summary: "Info Message", detail: "PrimeNG rocks" });
  }

  showWarn() {
    this.msgs = [];
    this.msgs.push({ severity: "warn", summary: "Warn Message", detail: "There are unsaved changes" });
  }

  showError() {
    this.msgs = [];
    this.msgs.push({ severity: "error", summary: "Error Message", detail: "Validation failed" });
  }

  showMultiple() {
    this.msgs = [];
    this.msgs.push({ severity: "info", summary: "Message 1", detail: "PrimeNG rocks" });
    this.msgs.push({ severity: "info", summary: "Message 2", detail: "PrimeUI rocks" });
    this.msgs.push({ severity: "info", summary: "Message 3", detail: "PrimeFaces rocks" });
  }

  showViaService() {
    this.messageService.add({ severity: "success", summary: "Service Message", detail: "Via MessageService" });
  }

  clear() {
    this.msgs = [];
  }


  count() {

  }

}
