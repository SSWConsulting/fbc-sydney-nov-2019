import { createAction, props } from '@ngrx/store';
import { Company } from '../../company/company';

export const setCompanies = createAction('[Company] Set', props<{ companies: Company[] }>());

export const deleteCompany = createAction('[Company] Delete', props<{ company: Company }>());
export const deleteCompanySuccess = createAction('[Company] DeleteSuccess', props<{ company: Company }>());
