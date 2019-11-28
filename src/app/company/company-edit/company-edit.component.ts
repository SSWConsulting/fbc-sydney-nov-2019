import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  isNewCompany: boolean;
  companyId: number;
  companyForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit() {
    this.companyId = this.activatedRoute.snapshot.params.id;
    this.isNewCompany = !this.companyId;

    this.companyForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('@ssw.com.au'),
      phone: new FormControl()
    });

    if (!this.isNewCompany) {
      this.companyService.getCompany(this.companyId)
      .subscribe(company => this.companyForm.patchValue(company));
    }
  }

  saveCompany() {
    if (this.isNewCompany) {
      const newCompany: Company = this.companyForm.value;
      this.companyService.addCompany(newCompany);
    } else {
      const updatedCompany: Company = {...this.companyForm.value, id: this.companyId };
      this.companyService.updateCompany(updatedCompany);
    }
    this.router.navigateByUrl('/company/list');
  }

}
