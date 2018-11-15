import { Component, OnInit } from "@angular/core";
import { MenuItem, Message } from "primeng/api";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {

  public items: MenuItem[];
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  
  constructor(private router: Router, private authService: AuthService) {
    
  }


  ngOnInit() {
    // this.isLoggedIn$ = this.authService.isLoggedIn$;
    // this.isLoggedOut$ = this.authService.isLoggedOut$;

    this.items = [
      {
        label: "Configuration",
        items: [
          { label: "Bulkload", icon: "pi pi-fw pi-plus", routerLink: ["bulkload"] },
          { label: "Request View", icon: "pi pi-fw pi-plus", routerLink: ["requestview"] },
          { label: "Photo", icon: "pi pi-fw pi-user", routerLink: ["photo"] },
          { label: "Demo", icon: "pi pi-fw pi-user", routerLink: ["demo"] },
          { label: "HistoryBigger", icon: "pi pi-fw pi-user", routerLink: ["historybigger"] },
          { label: "HistoryBig", icon: "pi pi-fw pi-user", routerLink: ["historybig"] },
          { label: "History", icon: "pi pi-fw pi-user", routerLink: ["history"] },
          { label: "Process", icon: "pi pi-fw pi-user", routerLink: ["process"] },
          { label: "Tenant", icon: "pi pi-fw pi-user", routerLink: ["tenant"] },
          { label: "Country Code", icon: "pi pi-fw pi-plus", routerLink: ["countrycode"] },
        ]
      }
    ];
  }

  login() {
    this.router.navigate([`/login`]);
  }

  home() {
    this.router.navigate([`/`]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate([`/`]);
  }
}
