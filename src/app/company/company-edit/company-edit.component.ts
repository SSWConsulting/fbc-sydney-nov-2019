import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  constructor() { }

  inputControl: FormControl = new FormControl();

  ngOnInit() {
    this.inputControl.valueChanges
    .pipe(debounceTime(2000))
    .subscribe(v => console.log('value changed to: ', v));
  }

}
