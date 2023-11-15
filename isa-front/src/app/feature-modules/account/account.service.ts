import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Account } from 'src/app/shared/model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:8080/accounts'; 

  constructor(private http: HttpClient) { }
  
  private loggedInAccountSubject = new Subject<Account | null>();
  loggedInAccount$: Observable<Account | null> = this.loggedInAccountSubject.asObservable();

  getAccountById(id: number): Observable<Account> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Account>(url);
  }

  saveAccount(account: Account): Observable<void> {
    return this.http.post<void>(this.apiUrl, account);
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }
}
