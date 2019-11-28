import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';


const routes: Routes = [
  { path: '', redirectTo: 'company/list', pathMatch: 'full'  },
  { path: 'company/list', component: CompanyListComponent },
  { path: 'company/new', component: CompanyEditComponent },
  { path: 'company/edit/:id', component: CompanyEditComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule) },
  // { path: 'admin', loadChildren: '../app/admin/admin.module#AdminModule' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
