import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdmProfissaoPage } from './adm-profissao.page';

describe('AdmProfissaoPage', () => {
  let component: AdmProfissaoPage;
  let fixture: ComponentFixture<AdmProfissaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmProfissaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdmProfissaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
