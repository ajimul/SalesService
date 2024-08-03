
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AuthenticationGuard } from './authentication/authentication.guard';

import { CreateStockComponent } from './app-stock/create-stock/create-stock.component';
import { ViewStockComponent } from './app-stock/view-stock/view-stock.component';
import { UpdateStockComponent } from './app-stock/update-stock/update-stock.component';
import { UpdatePurchaseComponent } from './app-purchase/update-purchase/update-purchase.component';
import { CreatePurchaseComponent } from './app-purchase/create-purchase/create-purchase.component';
import { MaterialModule } from './di-injection/material.module';
import { ViewPartyComponent } from './app-party/view-party/view-party.component';
import { UpdatePartyComponent } from './app-party/update-party/update-party.component';
import { CreatePartyComponent } from './app-party/create-party/create-party.component';
import { CreateSalesComponent } from './app-sales/create-sales/create-sales.component';
import { UpdateSalesComponent } from './app-sales/update-sales/update-sales.component';
import { UpdateAmcComponent } from './app-amc/update-amc/update-amc.component';
import { CreateAmcComponent } from './app-amc/create-amc/create-amc.component';
import { DashboardComponent } from './app-dashboard/dashboard/dashboard.component';
import { PaySalaryComponent } from './app-salary/pay-salary/pay-salary.component';
import { CreateSalaryComponent } from './app-salary/create-salary/create-salary.component';
import { CreateEmployeeComponent } from './app-employee/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './app-employee/update-employee/update-employee.component';
import { ViewEmployeeComponent } from './app-employee/view-employee/view-employee.component';
import { CreateExpencesComponent } from './app-expences/create-expences/create-expences.component';
import { CreateUserComponent } from './app-user/create-user/create-user.component';
import { ViewUserComponent } from './app-user/view-user/view-user.component';
import { UpdateUserComponent } from './app-user/update-user/update-user.component';
import { PayEmiComponent } from './app-emi-collection/pay-emi/pay-emi.component';
import { ViewEmiComponent } from './app-emi-collection/view-emi/view-emi.component';
import { CreateItemsGroupComponent } from './create-items-group/create-items-group/create-items-group.component';
import { CreateItemsLocationComponent } from './app-create-Items-location/create-items-location/create-items-location.component';
import { PrintComponent } from './app-print/print/print.component';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgModule } from '@angular/core';
import { ViewEmiControlComponent } from './app-emi-control/view-emi-control/view-emi-control.component';
import { ViewServiceControlComponent } from './app-service-control/view-service-control/view-service-control.component';
import { EmiDetailComponent } from './app-emi-collection/view-emi/emi-detail/emi-detail.component';
import { AlertComponent } from './app-alert-message/alert/alert.component';
import { AuthInterceptor } from './interceptor/token-interceptor.service';
import { AppBomComponent } from './app-bom/app-bom.component';


const appRouts: Routes = [
  { path: '', component: AppLoginComponent },
  { path: 'login', component: AppLoginComponent, pathMatch: 'full' },
  {
    path: 'home', component: AppHomeComponent, canActivate: [AuthenticationGuard],
    // path: 'home', component: AppHomeComponent,

    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'viewUser', component: ViewUserComponent },
      { path: 'viewEmployee', component: ViewEmployeeComponent },
      { path: 'viewStock', component: ViewStockComponent },
      { path: 'viewParty', component: ViewPartyComponent },
      { path: 'purchaseEntry', component: CreatePurchaseComponent },
      { path: 'salesEntry', component: CreateSalesComponent },
      { path: 'amcEntry', component: CreateAmcComponent },
      { path: 'emiCollect', component: ViewEmiComponent },
      { path: 'paySalary', component: PaySalaryComponent },
      { path: 'expences', component: CreateExpencesComponent },
      { path: 'emi-control', component: ViewEmiControlComponent },
      { path: 'service-control', component: ViewServiceControlComponent },
      { path: 'print-voucher', component: PrintComponent },
      { path: 'salesEdit', component: UpdateSalesComponent },
      { path: 'bom', component: AppBomComponent },
    ]

  },


]


@NgModule({
  declarations: [
    AppComponent,
    AppLoginComponent,
    AppHomeComponent,
    UpdatePartyComponent,
    ViewPartyComponent,
    CreatePartyComponent,
    CreateStockComponent,
    ViewStockComponent,
    UpdateStockComponent,
    CreateSalesComponent,
    CreatePurchaseComponent,
    UpdateSalesComponent,
    UpdateAmcComponent,
    CreateAmcComponent,
    DashboardComponent,
    ViewEmiComponent,
    PaySalaryComponent,
    CreateSalaryComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    ViewEmployeeComponent,
    CreateExpencesComponent,
    CreateUserComponent,
    ViewUserComponent,
    UpdateUserComponent,
    PayEmiComponent,
    CreateItemsGroupComponent,
    CreateItemsLocationComponent,
    ViewEmiControlComponent,
    ViewServiceControlComponent,
    PrintComponent,
    EmiDetailComponent,
    AlertComponent,
    AppBomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    MatTableModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,    
    RouterModule.forRoot(appRouts)
      
  
    ],
    providers: [{ provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptor,
        multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }
