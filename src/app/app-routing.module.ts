import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { TenantComponent } from "./entities/tenant/tenant.component";
import { CountryCodeComponent } from "./entities/country-code/country-code.component";
import { RequestViewComponent } from "./views/request-view/request-view.component";
import { ProcessComponent } from "./entities/process/process.component";
import { HistoryComponent } from "./entities/history/history.component";
import { PhotoComponent } from "./entities/photo/photo.component";
import { HistoryBigComponent } from "./entities/history-big/history-big.component";
import { HistoryBiggerComponent } from "./entities/history-bigger/history-bigger.component";
import { DemoComponent } from "./components/demo/demo.component";


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "tenant", component: TenantComponent },
  { path: "requestview", component: RequestViewComponent },
  { path: "countrycode", component: CountryCodeComponent },
  { path: "process", component: ProcessComponent },
  { path: "history", component: HistoryComponent },
  { path: "historybig", component: HistoryBigComponent },
  { path: "historybigger", component: HistoryBiggerComponent },
  { path: "photo", component: PhotoComponent },
  { path: "demo", component: DemoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
