import { Injectable } from '@angular/core';
import { CompanyService } from 'src/app/company/company.service';
import * as companyActions from './actions';
import { createEffect, Actions, ofType, Effect } from '@ngrx/effects';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class CompanyEffects {
  constructor(
    private actions$: Actions,
    private companyService: CompanyService
  ) { }


  deleteCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(companyActions.deleteCompany),
      exhaustMap(a => this.companyService.deleteCompanyHttp(a.company).pipe(
            map(c => companyActions.deleteCompanySuccess({ company: c})),
          )
        )
    ));

  }


