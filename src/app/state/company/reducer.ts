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
  }),

  on(companyActions.deleteCompanySuccess, (state, action) => {
    const id = action.company.id;
    const index = state.companies.indexOf(state.companies.find(c => c.id === id));
    const newList = [...state.companies];
    newList.splice(index, 1);
    return {...state, companies: newList };
  })
);

export function companyReducer(state: CompanyState | undefined, action: Action) {
  return reducer(state, action);
}
