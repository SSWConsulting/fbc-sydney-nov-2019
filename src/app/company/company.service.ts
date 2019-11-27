import { Injectable } from '@angular/core';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  getCompanies(): Company[] {
    return [
      {name: 'companyA', email: 'companyA@ssw.com.au', phone: 1234},
      {name: 'companyB', email: 'companyB@ssw.com.au', phone: 5678},
      {name: 'companyC', email: 'companyC@ssw.com.au', phone: 9012},
    ];
  }

}
