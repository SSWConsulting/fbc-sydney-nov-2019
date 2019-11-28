import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company/company.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'firebootcamp-crm';
  prod = environment.production ? 'PROD' : 'DEV';

  companyCount$: Observable<number>;

  constructor(
    private companyService: CompanyService
  ) {
  }

  ngOnInit(): void {
    this.companyCount$ = this.companyService.getCompanies().pipe(
      map(list => list.length)
    );
  }

}
