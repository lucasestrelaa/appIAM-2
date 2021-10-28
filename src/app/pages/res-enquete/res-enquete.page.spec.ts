import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResEnquetePage } from './res-enquete.page';

describe('ResEnquetePage', () => {
  let component: ResEnquetePage;
  let fixture: ComponentFixture<ResEnquetePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResEnquetePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResEnquetePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
