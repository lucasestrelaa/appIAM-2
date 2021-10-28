import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnqueteFinalizadaPage } from './enquete-finalizada.page';

describe('EnqueteFinalizadaPage', () => {
  let component: EnqueteFinalizadaPage;
  let fixture: ComponentFixture<EnqueteFinalizadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnqueteFinalizadaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnqueteFinalizadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
