import { Component, OnInit } from "@angular/core";
import { Message, MessageService } from "primeng/api";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  msgs: Message[];
  requests: MyRequest[];
  names: any[];

  constructor(private messageService: MessageService) {
    // this.requests = this.getArray();

    // this.names = [{ "id": 1, "first_name": "Jason", "last_name": "Martin" },
    // { "id": 2, "first_name": "Q", "last_name": "Holmes" },
    // { "id": 3, "first_name": "A", "last_name": "Woods" },
    // { "id": 4, "first_name": "Z", "last_name": "Castillo" },
    // { "id": 5, "first_name": "B", "last_name": "Butler" },
    // { "id": 6, "first_name": "E", "last_name": "Turner" },
    // { "id": 7, "first_name": "Y", "last_name": "Taylor" },
    // { "id": 8, "first_name": "W", "last_name": "Mendoza" },
    // { "id": 9, "first_name": "U", "last_name": "Ross" },
    // { "id": 10, "first_name": "P", "last_name": "Montgomery" }];


    console.log(`0`, this.names);
  }

  ngOnInit() {
    this.names.sort(function(name1, name2) {
      if (name1.first_name < name2.first_name) {
        return -1;
      } else if (name1.first_name > name2.first_name) {
        return 1;
      } else {
        return 0;
      }
    });

    console.log(`1`, this.names);
  }

  sort() {
    console.log(`1`, this.requests.sort(function(A, B) {
      const a = A.TenantName;
      const b = B.TenantName;
      if (A < B)
        return -1
      if (A > B)
        return 1
      return 0;

    }));
    console.log(`1`, this.requests);

    console.log(`2`, this.requests.sort(function(a, b) {
      if (a.RequestID > b.RequestID) {
        return 1;
      } else if (a.RequestID < b.RequestID) {
        return -1;
      }
      return 0;
    }));

    console.log(`3`, this.requests.sort(function(a, b) {
      if (a.CurrentStateID > b.CurrentStateID) {
        return 1;
      } else if (a.CurrentStateID < b.CurrentStateID) {
        return -1;
      }
      return 0;
    }));


    console.log(`4`, this.requests.sort(function(a, b) {
      if (a.TenantID > b.TenantID) {
        return 1;
      } else if (a.TenantID < b.TenantID) {
        return -1;
      }
      return 0;
    }));


    console.log(`5`, this.requests.sort(function(a, b) {
      if (a.TenantName > b.TenantName) {
        return 1;
      } else if (a.TenantName < b.TenantName) {
        return -1;
      }
      return 0;
    }));
  }

  showSuccess() {
    this.messageService.add({ severity: "success", summary: "Success Message", detail: "Order submitted" });
  }

  showInfo() {
    this.msgs = [];
    this.msgs.push({ severity: "info", summary: "Info Message", detail: "PrimeNG rocks" });
    this.messageService.add(this.msgs[0]);
  }

  showWarn() {
    this.msgs = [];
    this.msgs.push({ severity: "warn", summary: "Warn Message", detail: "There are unsaved changes" });
    this.messageService.add(this.msgs[0]);
  }

  showError() {
    this.msgs = [];
    this.msgs.push({ severity: "error", summary: "Error Message", detail: "Validation failed" });
    this.messageService.add(this.msgs[0]);
  }

  showMultiple() {
    this.msgs = [];
    this.msgs.push({ severity: "info", summary: "Message 1", detail: "PrimeNG rocks" });
    this.msgs.push({ severity: "info", summary: "Message 2", detail: "PrimeUI rocks" });
    this.msgs.push({ severity: "info", summary: "Message 3", detail: "PrimeFaces rocks" });
    this.messageService.addAll(this.msgs);
  }

  showViaService() {
    this.messageService.add({ severity: "success", summary: "Service Message", detail: "Via MessageService" });
  }

  clear() {
    this.msgs = [];
  }


  count() {

  }

  getArray() {
    return [{
      "Total": 7570,
      "RequestID": 1,
      "CurrentStateID": 600,
      "CurrentState": "Registered",
      "TenantName": "W",
      "TenantID": 2,
      "FileName": "x057-739-leiden-a116-betaalspecificatieopgaaf_test.xml",
      "DTAPstate": "D",
      "JobTypeName": "TestData1",
      "ScenarioNameID": 1,
      "ScenarioName": "TestNative",
      "DateTime": "2018-07-03T11:15:29.4033333"
    },
    {
      "Total": 7570,
      "RequestID": 2,
      "CurrentStateID": 500,
      "CurrentState": "RequestFinished",
      "TenantName": "Z",
      "TenantID": 2,
      "FileName": "x057-739-leiden-a116-betaalspecificatieopgaaf_test.xml",
      "DTAPstate": "D",
      "JobTypeName": "TestData2",
      "ScenarioNameID": 1,
      "ScenarioName": "TestNative",
      "DateTime": "2018-07-03T12:38:45.6826636"
    },
    {
      "Total": 7570,
      "RequestID": 3,
      "CurrentStateID": 400,
      "CurrentState": "RequestFinished",
      "TenantName": "Roel",
      "TenantID": 2,
      "FileName": "x057-739-leiden-a116-betaalspecificatieopgaaf_test.xml",
      "DTAPstate": "D",
      "JobTypeName": "TestData3",
      "ScenarioNameID": 1,
      "ScenarioName": "TestNative",
      "DateTime": "2018-07-03T12:40:53.2207038"
    },
    {
      "Total": 7570,
      "RequestID": 4,
      "CurrentStateID": 300,
      "CurrentState": "RequestFinished",
      "TenantName": "Q",
      "TenantID": 2,
      "FileName": "x057-739-leiden-a116-betaalspecificatieopgaaf_test.xml",
      "DTAPstate": "D",
      "JobTypeName": "TestData4",
      "ScenarioNameID": 1,
      "ScenarioName": "TestNative",
      "DateTime": "2018-07-03T12:49:33.1006602"
    },
    {
      "Total": 7570,
      "RequestID": 5,
      "CurrentStateID": 200,
      "CurrentState": "RequestError",
      "TenantName": "C",
      "TenantID": 2,
      "FileName": "x057-739-leiden-a116-betaalspecificatieopgaaf_test.xml",
      "DTAPstate": "D",
      "JobTypeName": "TestData5",
      "ScenarioNameID": 1,
      "ScenarioName": "TestNative",
      "DateTime": "2018-07-04T14:47:08.5471502"
    },
    {
      "Total": 7570,
      "RequestID": 6,
      "CurrentStateID": 100,
      "CurrentState": "Registered",
      "TenantName": "A",
      "TenantID": 2,
      "FileName": "x057-739-leiden-a116-betaalspecificatieopgaaf_test.xml",
      "DTAPstate": "D",
      "JobTypeName": "TestData6",
      "ScenarioNameID": 1,
      "ScenarioName": "TestNative",
      "DateTime": "2018-07-04T15:10:32.0900000"
    }];

  }

}

class MyRequest {
  RequestID: number;
  CurrentStateID: number;
  CurrentState: string;
  TenantName: string;
  TenantID: number;
  FileName: string;
  DTAPState: string;
  JobTypeName: string;
  ScenarioName: string;
  DateTime: Date; // date : "dd-MM-yyyy HH:mm:ss"
}
