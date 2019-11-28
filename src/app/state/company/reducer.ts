import { Company } from 'src/app/company/company';
import { createReducer, on, Action } from '@ngrx/store';
import * as companyActions from './actions'


export class CompanyState {
  companies: Company[];
}

export const initialState: CompanyState = {
  companies: []
} as CompanyState;


const reducer = createReducer(initialState,
  on(companyActions.setCompanies, (state, action) => {
    return {...state, companies: action.companies };
  })
);

export function companyReducer(state: CompanyState | undefined, action: Action) {
  return reducer(state, action);
}
