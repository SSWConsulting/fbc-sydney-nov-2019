import { createAction, props } from '@ngrx/store';
import { Company } from '../../company/company';

export const setCompanies = createAction('[Company] Set', props<{ companies: Company[] }>());
