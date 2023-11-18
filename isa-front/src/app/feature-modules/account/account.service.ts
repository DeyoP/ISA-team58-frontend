import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, tap } from 'rxjs';
import { Account } from 'src/app/shared/model/account.model';
import { RegisteredUser } from 'src/app/shared/model/registered-user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly loggedInAccountKey = 'loggedInAccount';
  private loggedInAccountSubject = new BehaviorSubject<Account | null>(null);
  loggedInAccount$: Observable<Account | null> = this.loggedInAccountSubject.asObservable();
  private userLoaded = false;

  private apiUrl = 'http://localhost:5555/accounts';

  constructor(private http: HttpClient) {
    this.loadLoggedInUser();
  }

  private loadLoggedInUser(): void {
    const storedUser = localStorage.getItem(this.loggedInAccountKey);
    if (storedUser) {
      const parsedUser: Account = JSON.parse(storedUser);
      this.setLoggedInAccount(parsedUser);
    }
    this.userLoaded = true;
  }

  setLoggedInAccount(account: Account | null): void {
    this.loggedInAccountSubject.next(account);
    if (account) {
      localStorage.setItem(this.loggedInAccountKey, JSON.stringify(account));
    } else {
      localStorage.removeItem(this.loggedInAccountKey);
    }
  }

  getLoggedInAccount(): Observable<Account | null> {
    if (!this.userLoaded) {
      this.loadLoggedInUser();
    }
    return this.loggedInAccount$;
  }

  activateAccount(token: string): Observable<string> {
    const activationUrl = `${this.apiUrl}/activate/${token}`;
    return this.http.get(activationUrl, { responseType: 'text' });
  }

  getAccountById(id: number): Observable<Account> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Account>(url);
  }

  getUserById(id: number): Observable<RegisteredUser> {
    return this.getAccountById(id) as Observable<RegisteredUser>;
  }

  saveRegisteredUser(user: RegisteredUser): Observable<void> {
    return this.http.post<void>(`http://localhost:5555/registeredUsers`, user);
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  login(email: string, password: string): Observable<Account> {
    const loginUrl = `${this.apiUrl}/login`;
    const loginRequest = { email, password };
  
    return this.http.post<Account>(loginUrl, loginRequest)
      .pipe(
        tap((account: Account) => {
          this.setLoggedInAccount(account);
        })
      );
  }

}
