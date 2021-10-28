import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DenquetesPage } from './denquetes.page';

describe('DenquetesPage', () => {
  let component: DenquetesPage;
  let fixture: ComponentFixture<DenquetesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenquetesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DenquetesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
