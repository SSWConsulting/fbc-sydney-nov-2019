import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private httpClient: HttpClient
  ) {
    this.loadCompanies();
  }

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  private companiesSubject$: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);
  companies$: Observable<Company[]> = this.companiesSubject$.asObservable();

  loadCompanies() {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
      .subscribe(list => this.companiesSubject$.next(list));
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  deleteCompany(company: Company): Observable<Company> {
    console.log('deleteCompany - Service called');
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${company.id}`)
    .pipe(
      catchError(this.handleError)
      );
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, company,
    { headers: new HttpHeaders().set('content-type', 'application/json') })
    .pipe(
      catchError(this.handleError)
      );
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`)
    .pipe(
      catchError(this.handleError)
      );
  }

  updateCompany(company: Company): Observable<Company> {
    return this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`, company,
    { headers: new HttpHeaders().set('content-type', 'application/json') })
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: Error): Observable<any> {
    console.log('ERROR CAUGHT IN SERVICE', error);
    return of([]);
    // return new Observable();
  }

}
