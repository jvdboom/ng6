import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MenuComponent } from "./menu/menu.component";

import { ButtonModule } from "primeng/button";
import { SplitButtonModule } from "primeng/splitbutton";
import { AccordionModule } from "primeng/accordion";
import { MenuModule } from "primeng/menu";
import { MenubarModule } from "primeng/menubar";
import { InputTextModule } from "primeng/inputtext";
import { HomeComponent } from "./components/home/home.component";

import { DBStandardService } from "./services/db-standard.service";
import { LoginComponent } from "./components/auth/login/login.component";
import { HttpModule } from "@angular/http";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";


// import { Observable } from "rxjs";
import { TenantComponent } from "./entities/tenant/tenant.component";
import { CountryCodeComponent } from "./entities/country-code/country-code.component";
import { ProcessComponent } from "./entities/process/process.component";
import { AuthService } from "./services/auth.service";
import { AuthInterceptor } from "./services/auth.interceptor";


import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { PaginatorModule } from "primeng/paginator";
import { RequestViewComponent } from "./views/request-view/request-view.component";
import { ErrorInterceptor } from "./services/error.interceptor";
import { MessageService } from "primeng/api";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import {ToastModule} from "primeng/toast";
import {PanelModule} from "primeng/panel";
import { HistoryComponent } from "./entities/history/history.component";
import { PhotoComponent } from "./entities/photo/photo.component";
import { HistoryBigComponent } from "./entities/history-big/history-big.component";
import { HistoryBiggerComponent } from "./entities/history-bigger/history-bigger.component";
import { DemoComponent } from './components/demo/demo.component';
// import "rxjs/add/operators";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    TenantComponent,
    CountryCodeComponent,
    RequestViewComponent,
    ProcessComponent,
    HistoryComponent,
    PhotoComponent,
    HistoryBigComponent,
    HistoryBiggerComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    HttpModule,
    HttpClientModule,
    SplitButtonModule,
    InputTextModule,
    AccordionModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    PanelModule,
    DropdownModule,
    PaginatorModule,
    TableModule,
    AppRoutingModule
  ],
  providers: [DBStandardService, AuthService, MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
