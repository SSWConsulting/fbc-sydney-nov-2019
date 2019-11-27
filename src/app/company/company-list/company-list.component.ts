import { Component, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies: Company[];

  constructor() { }

  ngOnInit() {
    this.companies = [
      {name: 'companyA', email: 'companyA@ssw.com.au', phone: 1234},
      {name: 'companyB', email: 'companyB@ssw.com.au', phone: 5678},
      {name: 'companyC', email: 'companyC@ssw.com.au', phone: 9012},
    ];
  }

}
