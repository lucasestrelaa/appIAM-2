import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnqueteSemanalPage } from './enquete-semanal.page';

describe('EnqueteSemanalPage', () => {
  let component: EnqueteSemanalPage;
  let fixture: ComponentFixture<EnqueteSemanalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnqueteSemanalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnqueteSemanalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
