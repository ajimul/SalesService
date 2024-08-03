import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { login_entity } from '../model/login-entity';
import { Stock } from '../model/stock';
import { PayEmi } from '../model/pay-emi';
import { EmployeeDetailsDTO } from '../model/employee';
import { PaySalary } from '../model/paySalary';
import {
  EmiCollection,
  EmiConfig,
  ProductServiceConfig,
} from '../model/emiCollection';
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
import {
  AddInventoryItemsDTO,
  AddInventoryDTO,
  AddInventoryJournalDTO,
  AddInventoryGroupDTO,
} from '../model/add-inventory';
import { AmcServiceEmi } from '../model/amc';
import { AccountList } from '../model/account-list';
import { invoiceHeader } from '../model/InvoiceHeader';
import { UpdateInventoryItemsDTO } from '../model/update-inventory';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private apiServerUrl = environment.apiBaseUrl;
  token: string | undefined;
  constructor(private http: HttpClient, private route: Router) {}
  //----------------------------------------------LOGIN SERVICE------------------------------------------------------>
  login(user: any) {
    // const options = {
    //   withCredentials: true
    // };
    return this.http.post(`${this.apiServerUrl}auth/login`, user);
  }

  originTest(): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*', // Replace with your allowed origin
    // });
    const options = {
      responseType: 'text' as 'json', // Set the responseType to 'text'
    };

    return this.http.get(`${this.apiServerUrl}test`, options);
  }

  isLogged() {
    return localStorage.getItem('token') != null;
  }
  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
    localStorage.clear();
  }

  //----------------------------------------------PDF API TEST------------------------------------------------------>
  getPDF(pid: string, sname: string, standard: string): Observable<any> {
    return this.http.get(
      `${this.apiServerUrl}/pdf/${pid}/${sname}/${standard}`,
      { responseType: 'blob' }
    );
    // return this.http.get(`${this.apiServerUrl}/pdf`,{ responseType: 'blob' as 'json', observe: 'response' as 'body' });
  }
  getAccountType(): Observable<AccountType[]> {
    return this.http.get<AccountType[]>(
      `${this.apiServerUrl}/preset/data/ac/type`
    );
  }
  addJournal(journal: Journal): Observable<Journal> {
    return this.http.post<Journal>(`${this.apiServerUrl}journal/add`, journal);
  }
  addLedgerx(ledger: Ledgerx): Observable<Ledgerx> {
    return this.http.post<Ledgerx>(`${this.apiServerUrl}ledger/add`, ledger);
  }
  getTransactional_AMC_Accounts(): Observable<AccountList[]> {
    return this.http.get<AccountList[]>(`${this.apiServerUrl}accounts/amc`);
  }
  getTransactional_sales_Accounts(): Observable<AccountList[]> {
    return this.http.get<AccountList[]>(`${this.apiServerUrl}accounts/sales`);
  }
  getTransactional_purchase_Accounts(): Observable<AccountList[]> {
    return this.http.get<AccountList[]>(
      `${this.apiServerUrl}accounts/purchase`
    );
  }
  getTransactional_emi_Accounts(): Observable<AccountList[]> {
    return this.http.get<AccountList[]>(`${this.apiServerUrl}accounts/emi`);
  }
  getTransactional_salary_Accounts(): Observable<AccountList[]> {
    return this.http.get<AccountList[]>(`${this.apiServerUrl}accounts/salary`);
  }
  getPartyAccounts(): Observable<PartyDetailsDTO[]> {
    return this.http.get<PartyDetailsDTO[]>(
      `${this.apiServerUrl}accounts/party`
    );
  }
  addPartyAccounts(party: any): Observable<PartyDetailsDTO> {
    return this.http.post<PartyDetailsDTO>(
      `${this.apiServerUrl}accounts/party/add`,
      party
    );
  }
  updatePartyAccounts(party: any): Observable<PartyDetailsDTO> {
    console.log(party);
    return this.http.put<PartyDetailsDTO>(
      `${this.apiServerUrl}accounts/party/update`,
      party
    );
  }
  getStocks(): Observable<UpdateInventoryItemsDTO[]> {
    return this.http.get<UpdateInventoryItemsDTO[]>(
      `${this.apiServerUrl}inventory/`
    );
  }
  getStocksById(id: number): Observable<AddInventoryItemsDTO> {
    return this.http.get<AddInventoryItemsDTO>(
      `${this.apiServerUrl}inventory/${id}`
    );
  }

  getEmiList(): Observable<EmiCollection[]> {
    return this.http.get<EmiCollection[]>(`${this.apiServerUrl}emi/`);
  }
  getEmiConfig(): Observable<EmiConfig[]> {
    return this.http.get<EmiConfig[]>(`${this.apiServerUrl}emi/config`);
  }
  getProductServiceList(): Observable<ProductServiceConfig[]> {
    return this.http.get<ProductServiceConfig[]>(
      `${this.apiServerUrl}product/service/config`
    );
  }
  updateEmiConfig(data: any): Observable<any> {
    return this.http.put<EmiConfig>(`${this.apiServerUrl}emi/update`, data);
  }
  updateProductServiceConfig(data: any): Observable<any> {
    return this.http.put<ProductServiceConfig>(
      `${this.apiServerUrl}product/service/update`,
      data
    );
  }
  payEmi(payEmi: PayEmi): Observable<any> {
    return this.http.post<Emi>(`${this.apiServerUrl}emi/pay`, payEmi);
  }
  paySalary(paySalary: PaySalary): Observable<any> {
    return this.http.post<PaySalary>(
      `${this.apiServerUrl}salary/add`,
      paySalary
    );
  }
  //  getUser(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.apiServerUrl}user/`);
  // }
  addStock(party: any): Observable<any> {
    return this.http.post<Stock>(`${this.apiServerUrl}stock/add`, party);
  }
  addInventory(inventory: AddInventoryDTO): Observable<AddInventoryDTO> {
    return this.http.post<AddInventoryDTO>(
      `${this.apiServerUrl}inventory/add`,
      inventory
    );
  }
  //  addEmployee(employee: Employee): Observable<any> {
  //   return this.http.post<Employee>(`${this.apiServerUrl}accounts/emp/add`, employee);
  // }

  send_SMS(sms: any): Observable<SMS> {
    return this.http.post<SMS>(`${this.apiServerUrl}sms/send`, sms);
  }
  addEmployee(employee: any): Observable<any> {
    return this.http.post<EmployeeDetailsDTO>(
      `${this.apiServerUrl}accounts/emp/add`,
      employee
    );
  }
  getEmployee(): Observable<EmployeeDetailsDTO[]> {
    return this.http.get<EmployeeDetailsDTO[]>(
      `${this.apiServerUrl}accounts/emp`
    );
  }
  updateEmployee(employee: any): Observable<EmployeeDetailsDTO> {
    return this.http.put<EmployeeDetailsDTO>(
      `${this.apiServerUrl}accounts/emp/update`,
      employee
    );
  }
  updateInventory(
    items: UpdateInventoryItemsDTO
  ): Observable<UpdateInventoryItemsDTO> {
    return this.http.put<UpdateInventoryItemsDTO>(
      `${this.apiServerUrl}inventory/update`,
      items
    );
  }
  //  addInventoryJournal(inventoryJournal: any): Observable<InventoryJournal> {
  //   return this.http.post<InventoryJournal>(`${this.apiServerUrl}inventory/journal/add`, inventoryJournal);
  // }
  addPurchase(book: Purchase): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}purchase/add`, book);
  }
  addPurchaseReturn(book: Purchase): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}purchase/return/add`, book);
  }
  addSalesReturn(book: Purchase): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}sales/return/add`, book);
  }
  addSales(sales: Sales): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}sales/add`, sales);
  }
  addSalesEdit(sales: Sales, voucherId: number): Observable<Sales> {
    return this.http.post<Sales>(
      `${this.apiServerUrl}sales/edit/${voucherId}`,
      sales
    );
  }
  deleteInvoice(voucherId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiServerUrl}sales/delete/${voucherId}`
    );
  }
  addAmcServiceEmi(amc: AmcServiceEmi): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}amc/service/add`, amc);
  }
  addProductOfService(productService: Product[]): Observable<any> {
    return this.http.post<Product[]>(
      `${this.apiServerUrl}sales/add/product/s`,
      productService
    );
  }
  addInstallmentService(productService: Product[]): Observable<any> {
    return this.http.post<Product[]>(
      `${this.apiServerUrl}sales/add/installment/s`,
      productService
    );
  }
  getItemsGroupList(): Observable<AddInventoryGroupDTO[]> {
    return this.http.get<AddInventoryGroupDTO[]>(
      `${this.apiServerUrl}items/group/`
    );
  }
  getItemsLocationList(): Observable<InventoryGroupLocation[]> {
    return this.http.get<InventoryGroupLocation[]>(
      `${this.apiServerUrl}items/location/`
    );
  }
  addItemGroup(itemsGroup: string): Observable<AddInventoryGroupDTO> {
    return this.http.post<AddInventoryGroupDTO>(
      `${this.apiServerUrl}items/group/add`,
      itemsGroup
    );
  }
  addItemLocation(itemsLocation: string): Observable<AddInventoryGroupDTO> {
    return this.http.post<AddInventoryGroupDTO>(
      `${this.apiServerUrl}items/location/add`,
      itemsLocation
    );
  }
  getInvoiceListToPrint(): Observable<InvoiceList[]> {
    return this.http.get<InvoiceList[]>(`${this.apiServerUrl}invoice/`);
  }
  getInvoicePdf(bookInfoId: number): Observable<any> {
    return this.http.get(`${this.apiServerUrl}single/report/${bookInfoId}`, {
      responseType: 'blob',
    });
    // return this.http.get(`${this.apiServerUrl}api/single/report/${acId}/${bookInfoId}`, { responseType: 'blob' as 'json', observe: 'response' as 'body' });
  }
  getBookDetailsList(bookInfoId: number): Observable<BookDetails[]> {
    return this.http.get<BookDetails[]>(
      `${this.apiServerUrl}inven/items/books/${bookInfoId}`
    );
  }
  getInvoiceHeader(): Observable<invoiceHeader[]> {
    return this.http.get<invoiceHeader[]>(
      `${this.apiServerUrl}invoice-headers/`
    );
  }
  addInvoiceHeader(invoiceHeader: string): Observable<invoiceHeader> {
    return this.http.post<invoiceHeader>(
      `${this.apiServerUrl}invoice-headers/add`,
      invoiceHeader
    );
  }

  saveContact(contact: any): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}contacts`, contact);
  }
}
