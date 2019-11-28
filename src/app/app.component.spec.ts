import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { CompanyService } from './company/company.service';
import { DebugElement } from '@angular/core';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyTableComponent } from './company/company-table/company-table.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers , metaReducers, AllEffects} from './state';
import { EffectsModule } from '@ngrx/effects';
import { APP_BASE_HREF } from '@angular/common';


describe(`test unint testing`, () => {
  it('should add 1+1', () => {
    expect(1 + 1).toBe(2);
  });
});


describe(`Component: App Component`, () => {
  it('should create app component', () => {
    const component = new AppComponent(null);
    expect(component.title).toEqual('firebootcamp-crm');
  });
});


describe(`Component: App Component`, () => {
  let component;
  let companyService;

  beforeEach(() => {
    companyService = {
      getCompanies: () => of([{
        name: 'My Fake Corp',
        email: 'fake@news.com',
        phone: 12345
      }])
    };
    component = new AppComponent(companyService);
  });

  it('should have 1 fake company', () => {
    component.ngOnInit();
    component.companyCount$.subscribe(c => {
      expect(c).toEqual(1);
    });
  });
});


describe(`Component: App Component`, () => {
  let component;
  let companyService;

  beforeEach(() => {
    companyService = {
      getCompanies: () => {}
    };
    component = new AppComponent(companyService);
  });

  it('shoule use spyon', () => {
    spyOn(companyService, 'getCompanies').and.returnValue(of([
      {
        name: 'My Fake Corp',
        email: 'fake@news.com',
        phone: 12345
      },
      {
        name: 'My Fake Corp2',
        email: 'fake2@news.com',
        phone: 12222345
      }
    ]));
    component.ngOnInit();
    component.companyCount$.subscribe(c => {
      expect(c).toEqual(2);
    });
  });
});


describe(`Testbed`, () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let companySvc: CompanyService;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CompanyListComponent,
        CompanyTableComponent,
        NotFoundComponent,
        CompanyEditComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        HttpClientModule,

        StoreModule.forRoot(reducers, {
          metaReducers,
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
          }
        }),
        EffectsModule.forRoot(AllEffects),
      ],
      providers: [ {provide: APP_BASE_HREF, useValue: '/'} ],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    companySvc = TestBed.get(CompanyService);
  });

  it(`company count = 1`, () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        id: '12',
        name: 'Fake Company C',
        email: 'fakeEmail@ssw.com.au',
        phone: 12345
      }
    ]));

    fixture.detectChanges();

    expect(component.companyCount$.subscribe(c => {
      expect(c).toEqual(1);
    }));

    let el  = fixture.debugElement.query(By.css('#company-count')).nativeElement;
    expect(el.textContent).toEqual('1');

  });
});
