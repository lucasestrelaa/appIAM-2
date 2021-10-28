import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResFinalizadosPage } from './res-finalizados.page';

describe('ResFinalizadosPage', () => {
  let component: ResFinalizadosPage;
  let fixture: ComponentFixture<ResFinalizadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResFinalizadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResFinalizadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
