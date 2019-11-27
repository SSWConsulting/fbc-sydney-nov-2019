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

  }

  saveCompany() {
    const newCompany: Company = this.companyForm.value;
    this.companyService.addCompany(newCompany)
    .subscribe(c => this.router.navigateByUrl('/company/list'));
  }

}
