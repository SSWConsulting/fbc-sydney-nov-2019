import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../state';
import * as companyActions from '../state/company/actions';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) {
    this.loadCompanies();
  }

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  // private companiesSubject$: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);
  // companies$: Observable<Company[]> = this.companiesSubject$.asObservable();

  loadCompanies() {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
      .subscribe(list => this.store.dispatch(companyActions.setCompanies({ companies: list })));
  }

  getCompanies(): Observable<Company[]> {
    return this.store.select(s => s.company.companies);
  }

  deleteCompany(company: Company) {
    console.log('deleteCompany - Service called');
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${company.id}`)
    .pipe(
      catchError(this.handleError)
      )
      .subscribe(c => this.loadCompanies());
  }

  addCompany(company: Company){
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, company,
    { headers: new HttpHeaders().set('content-type', 'application/json') })
    .pipe(
      catchError(this.handleError)
      )
      .subscribe(c => this.loadCompanies());
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`)
    .pipe(
      catchError(this.handleError)
      );
  }

  updateCompany(company: Company) {
    return this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`, company,
    { headers: new HttpHeaders().set('content-type', 'application/json') })
    .pipe(
      catchError(this.handleError)
    )
    .subscribe(c => this.loadCompanies());
  }

  handleError(error: Error): Observable<any> {
    console.log('ERROR CAUGHT IN SERVICE', error);
    return of([]);
    // return new Observable();
  }

}
