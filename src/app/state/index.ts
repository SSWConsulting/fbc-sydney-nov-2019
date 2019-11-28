import { CompanyState, companyReducer } from './company/reducer';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { CompanyEffects } from './company/effect';


export interface AppState {
  company: CompanyState;
}

export const reducers: ActionReducerMap<AppState> = {
  company: companyReducer
};

export const metaReducers: MetaReducer<AppState>[]
 = [];

export const AllEffects = [ CompanyEffects ];
