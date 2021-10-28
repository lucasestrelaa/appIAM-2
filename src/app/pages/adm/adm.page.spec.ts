import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdmPage } from './adm.page';

describe('AdmPage', () => {
  let component: AdmPage;
  let fixture: ComponentFixture<AdmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
