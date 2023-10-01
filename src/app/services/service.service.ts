import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { login_entity } from '../model/login-entity';
import { Stock } from '../model/stock';
import { PayEmi } from '../model/pay-emi';
import { EmployeeDetailsDTO } from '../model/employee';
import { PaySalary } from '../model/paySalary';
import { EmiCollection, EmiConfig, ProductServiceConfig } from '../model/emiCollection';
import { environment } from 'src/environments/environment';
import { InventoryGroupLocation } from '../model/inventory-group';
import { AccountType } from '../model/account-type';
import { Journal } from '../model/journal';
import { Ledgerx } from '../model/ledger';
import { PartyDetailsDTO } from '../model/party';
import { Emi } from '../model/emi';
import { User } from '../model/user';
import { SMS } from '../model/sms';
import { Purchase } from '../model/purchase';
import { Sales } from '../model/sales';
import { BookDetails } from '../model/bookdetails';
import { InvoiceList } from '../model/invoicelist';
import { Product } from '../model/product';
import { AddInventoryItemsDTO, AddInventoryDTO, AddInventoryJournalDTO, AddInventoryGroupDTO } from '../model/add-inventory';
import { AmcServiceEmi } from '../model/amc';
import { AccountList } from '../model/account-list';
import { invoiceHeader } from '../model/InvoiceHeader';
import { UpdateInventoryItemsDTO } from '../model/update-inventory';

@Injectable({
  providedIn: 'root'
})
export class Service {
 
  
  private apiServerUrl = environment.apiBaseUrl;
  token: string | undefined;
  constructor(private http: HttpClient, private route: Router) { }
  //----------------------------------------------LOGIN SERVICE------------------------------------------------------>
  Proceddlogin(usercred: any) {
    // const options = {
    //   withCredentials: true
    // };
    return this.http.post(`${this.apiServerUrl}authenticate`, usercred);
  }

  public OriginTest(): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*', // Replace with your allowed origin
    // });
    const options = {
      responseType: 'text' as 'json' // Set the responseType to 'text'
    };
  
    return this.http.get(`${this.apiServerUrl}test`,options);
  }

  IsLogged() {
    return localStorage.getItem("token") != null;
  }
  Logout() {
    localStorage.removeItem("token");
    this.route.navigate(['/login']);
    localStorage.clear();
  }

  //----------------------------------------------PDF API TEST------------------------------------------------------>
  public getPDF(pid: string, sname: string, standard: string): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/pdf/${pid}/${sname}/${standard}`, { responseType: "blob" });
    // return this.http.get(`${this.apiServerUrl}/pdf`,{ responseType: 'blob' as 'json', observe: 'response' as 'body' });
  }
  public getAccountType(): Observable<AccountType[]> {
    return this.http.get<AccountType[]>(`${this.apiServerUrl}/preset/data/ac/type`);
  }
  public addJournal(journal: Journal): Observable<Journal> {
    return this.http.post<Journal>(`${this.apiServerUrl}journal/add`, journal);
  }
  public addLedgerx(ledger: Ledgerx): Observable<Ledgerx> {
    return this.http.post<Ledgerx>(`${this.apiServerUrl}ledger/add`, ledger);
  }
  public getTransactional_AMC_Accounts(): Observable<AccountList[]> {
    return this.http.get<AccountList[]>(`${this.apiServerUrl}accounts/amc`);
  }
  public getTransactional_sales_Accounts(): Observable<AccountList[]> {
    return this.http.get<AccountList[]>(`${this.apiServerUrl}accounts/sales`);
  }
  public getTransactional_purchase_Accounts(): Observable<AccountList[]> {
    return this.http.get<AccountList[]>(`${this.apiServerUrl}accounts/purchase`);
  }
  public getTransactional_emi_Accounts(): Observable<AccountList[]> {
    return this.http.get<AccountList[]>(`${this.apiServerUrl}accounts/emi`);
  }
  public getTransactional_salary_Accounts(): Observable<AccountList[]> {
    return this.http.get<AccountList[]>(`${this.apiServerUrl}accounts/salary`);
  }
  public getPartyAccounts(): Observable<PartyDetailsDTO[]> {
    return this.http.get<PartyDetailsDTO[]>(`${this.apiServerUrl}accounts/party`);
  }
  public addPartyAccounts(party: any): Observable<PartyDetailsDTO> {
    return this.http.post<PartyDetailsDTO>(`${this.apiServerUrl}accounts/party/add`, party);
  }
  public updatePartyAccounts(party: any): Observable<PartyDetailsDTO> {
    console.log(party)
    return this.http.put<PartyDetailsDTO>(`${this.apiServerUrl}accounts/party/update`, party);
  }
  public getStocks(): Observable<UpdateInventoryItemsDTO[]> {
    return this.http.get<UpdateInventoryItemsDTO[]>(`${this.apiServerUrl}inventory/`);
  }
  public getStocksById(id:number): Observable<AddInventoryItemsDTO> {
    return this.http.get<AddInventoryItemsDTO>(`${this.apiServerUrl}inventory/${id}`);
  }

  public getEmiList(): Observable<EmiCollection[]> {
    return this.http.get<EmiCollection[]>(`${this.apiServerUrl}emi/`);
  }
  public getEmiConfig(): Observable<EmiConfig[]> {
    return this.http.get<EmiConfig[]>(`${this.apiServerUrl}emi/config`);
  }
  public getProductServiceList(): Observable<ProductServiceConfig[]> {
    return this.http.get<ProductServiceConfig[]>(`${this.apiServerUrl}product/service/config`);
  }
  public updateEmiConfig(data: any): Observable<any> {
    return this.http.put<EmiConfig>(`${this.apiServerUrl}emi/update`, data);
  }
  public updateProductServiceConfig(data: any): Observable<any> {
    return this.http.put<ProductServiceConfig>(`${this.apiServerUrl}product/service/update`, data);
  }
  public payEmi(payEmi: PayEmi): Observable<any> {
    return this.http.post<Emi>(`${this.apiServerUrl}emi/pay`, payEmi);
  }
  public paySalary(paySalary: PaySalary): Observable<any> {
    return this.http.post<PaySalary>(`${this.apiServerUrl}salary/add`, paySalary);
  }
  // public getUser(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.apiServerUrl}user/`);
  // }
  public addStock(party: any): Observable<any> {
    return this.http.post<Stock>(`${this.apiServerUrl}stock/add`, party);
  }
  public addInventory(inventory: AddInventoryDTO): Observable<AddInventoryDTO> {
    return this.http.post<AddInventoryDTO>(`${this.apiServerUrl}inventory/add`, inventory);
  }
  // public addEmployee(employee: Employee): Observable<any> {
  //   return this.http.post<Employee>(`${this.apiServerUrl}accounts/emp/add`, employee);
  // }

  public send_SMS(sms: any): Observable<SMS> {
    return this.http.post<SMS>(`${this.apiServerUrl}sms/send`, sms);
  }
  public addEmployee(employee: any): Observable<any> {
    return this.http.post<EmployeeDetailsDTO>(`${this.apiServerUrl}accounts/emp/add`, employee);
  }
  public getEmployee(): Observable<EmployeeDetailsDTO[]> {
    return this.http.get<EmployeeDetailsDTO[]>(`${this.apiServerUrl}accounts/emp`);
  }
  public UpdateEmployee(employee: any): Observable<EmployeeDetailsDTO> {
    return this.http.put<EmployeeDetailsDTO>(`${this.apiServerUrl}accounts/emp/update`, employee);
  }
  public UpdateInventory(items: UpdateInventoryItemsDTO): Observable<UpdateInventoryItemsDTO> {
    return this.http.put<UpdateInventoryItemsDTO>(`${this.apiServerUrl}inventory/update`, items);
  }
  // public addInventoryJournal(inventoryJournal: any): Observable<InventoryJournal> {
  //   return this.http.post<InventoryJournal>(`${this.apiServerUrl}inventory/journal/add`, inventoryJournal);
  // }
  public addPurchase(book: Purchase): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}purchase/add`, book);
  }
  public addPurchaseReturn(book: Purchase): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}purchase/return/add`, book);
  }
  public addSalesReturn(book: Purchase): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}sales/return/add`, book);
  }
  public addSales(sales: Sales): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}sales/add`, sales);
  }
  public addSalesEdit(sales: Sales,voucherId:number): Observable<Sales> {
    return this.http.post<Sales>(`${this.apiServerUrl}sales/edit/${voucherId}`, sales);
  }
  public deleteInvoice(voucherId:number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}sales/delete/${voucherId}`);
  }
  public addAmcServiceEmi(amc: AmcServiceEmi): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}amc/service/add`, amc);
  }
  public addProductOfService(productService: Product[]): Observable<any> {
    return this.http.post<Product[]>(`${this.apiServerUrl}sales/add/product/s`, productService);
  }
  public addInstallmentService(productService: Product[]): Observable<any> {
    return this.http.post<Product[]>(`${this.apiServerUrl}sales/add/installment/s`, productService);
  }
  public getItemsGroupList(): Observable<AddInventoryGroupDTO[]> {
    return this.http.get<AddInventoryGroupDTO[]>(`${this.apiServerUrl}items/group/`);
  }
  public getItemsLocationList(): Observable<InventoryGroupLocation[]> {
    return this.http.get<InventoryGroupLocation[]>(`${this.apiServerUrl}items/location/`);
  }
  public addItemGroup(itemsGroup: string): Observable<AddInventoryGroupDTO>{
    return this.http.post<AddInventoryGroupDTO>(`${this.apiServerUrl}items/group/add`,itemsGroup);
  }
  public addItemLocation(itemsLocation: string): Observable<AddInventoryGroupDTO>{
    return this.http.post<AddInventoryGroupDTO>(`${this.apiServerUrl}items/location/add`,itemsLocation);
  }
  public getInvoiceListToPrint(): Observable<InvoiceList[]> {
    return this.http.get<InvoiceList[]>(`${this.apiServerUrl}invoice/`);
  }
    public getInvoicePdf(bookInfoId:number): Observable<any> {
    return this.http.get(`${this.apiServerUrl}single/report/${bookInfoId}`, { responseType: "blob" });
    // return this.http.get(`${this.apiServerUrl}api/single/report/${acId}/${bookInfoId}`, { responseType: 'blob' as 'json', observe: 'response' as 'body' });
  }
  public getBookDetailsList(bookInfoId:number): Observable<BookDetails[]> {
    return this.http.get<BookDetails[]>(`${this.apiServerUrl}inven/items/books/${bookInfoId}`);
  }
  public getInvoiceHeader(): Observable<invoiceHeader[]> {
    return this.http.get<invoiceHeader[]>(`${this.apiServerUrl}invoice-headers/`);
  }
  public addInvoiceHeader(invoiceHeader: string): Observable<invoiceHeader>{
    return this.http.post<invoiceHeader>(`${this.apiServerUrl}invoice-headers/add`,invoiceHeader);
  }
}

