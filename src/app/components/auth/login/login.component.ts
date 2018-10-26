import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Observable } from "rxjs";
import { SimpleResult } from "src/app/models/simple-result";
import * as moment from "moment";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private messageService: MessageService) {
    localStorage.setItem("canld-jvdboom", "ikweethetnie");
  }
  login$: Observable<SimpleResult>;
  login2$: Observable<SimpleResult>;

  ngOnInit() {
   
  }

  login() {
    
      .subscribe((simpleResult: SimpleResult) => {
        console.log(`simpleResult`, simpleResult);
        if (simpleResult && simpleResult.Key === "Error") {
          this.messageService.add({ severity: "error", summary: simpleResult.Value, detail: simpleResult.Key });
          this.router.navigate(["/login"]);
        } else {
          console.log(`login okay`, simpleResult);
          this.messageService.add({ severity: "error", summary: simpleResult.Value, detail: simpleResult.Key });
          // console.log(`"Login setItem("currentuser", simpleResult.Value)`, simpleResult);
          // localStorage.setItem("currentuser", simpleResult.Value);
        }
      });
  }

  time() {
    const timeStamp = "YY-MM-DD  HH:mm:ss:SSS";
    const time = "2018-07-03 11:15:29.4033333";
    console.log(time);
    const timezoneOffset = new Date().getTimezoneOffset();
    const timezoneOffset1 = new Date().getTime()
    console.log(`timezoneOffset`, timezoneOffset)
    console.log(`timezoneOffset1`, timezoneOffset1)
    const guiMoment: moment.Moment = moment(time).local();

    console.log(`moment().utcOffset();`, moment().utcOffset());
    console.log(`guiMoment`, guiMoment.format(timeStamp));
    const t = guiMoment.add(moment().utcOffset(), "m").format(timeStamp);
    console.log(`t`, t);

  }
}
