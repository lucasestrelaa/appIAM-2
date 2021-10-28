import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CenquetePage } from './cenquete.page';

describe('CenquetePage', () => {
  let component: CenquetePage;
  let fixture: ComponentFixture<CenquetePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenquetePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CenquetePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
