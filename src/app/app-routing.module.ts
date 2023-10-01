import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAmcComponent } from './app-amc/create-amc/create-amc.component';
import { DashboardComponent } from './app-dashboard/dashboard/dashboard.component';
import { ViewEmiComponent } from './app-emi-collection/view-emi/view-emi.component';
import { ViewEmiControlComponent } from './app-emi-control/view-emi-control/view-emi-control.component';
import { ViewEmployeeComponent } from './app-employee/view-employee/view-employee.component';
import { CreateExpencesComponent } from './app-expences/create-expences/create-expences.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { ViewPartyComponent } from './app-party/view-party/view-party.component';
import { PrintComponent } from './app-print/print/print.component';
import { CreatePurchaseComponent } from './app-purchase/create-purchase/create-purchase.component';
import { PaySalaryComponent } from './app-salary/pay-salary/pay-salary.component';
import { CreateSalesComponent } from './app-sales/create-sales/create-sales.component';
import { UpdateSalesComponent } from './app-sales/update-sales/update-sales.component';
import { ViewServiceControlComponent } from './app-service-control/view-service-control/view-service-control.component';
import { ViewStockComponent } from './app-stock/view-stock/view-stock.component';
import { ViewUserComponent } from './app-user/view-user/view-user.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/token-interceptor.service';

// const routes: Routes = [
//   { path: '', component: AppLoginComponent },
//   { path: 'login', component: AppLoginComponent, pathMatch: 'full' },
//   {
//     path: 'home', component: AppHomeComponent, canActivate: [AuthenticationGuard],
//     // path: 'home', component: AppHomeComponent,

//     children: [
//       { path: 'dashboard', component: DashboardComponent },
//       { path: 'viewUser', component: ViewUserComponent },
//       { path: 'viewEmployee', component: ViewEmployeeComponent },
//       { path: 'viewStock', component: ViewStockComponent },
//       { path: 'viewParty', component: ViewPartyComponent },
//       { path: 'purchaseEntry', component: CreatePurchaseComponent },
//       { path: 'salesEntry', component: CreateSalesComponent },
//       { path: 'amcEntry', component: CreateAmcComponent },
//       { path: 'emiCollect', component: ViewEmiComponent },
//       { path: 'paySalary', component: PaySalaryComponent },
//       { path: 'expences', component: CreateExpencesComponent },
//       { path: 'emi-control', component: ViewEmiControlComponent },
//       { path: 'service-control', component: ViewServiceControlComponent },
//       { path: 'print-voucher', component: PrintComponent },
//       { path: 'salesEdit', component: UpdateSalesComponent },
//     ]

//   },


// ]

@NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
  

})
export class AppRoutingModule { }
