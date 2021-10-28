import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdmRAPage } from './adm-ra.page';

describe('AdmRAPage', () => {
  let component: AdmRAPage;
  let fixture: ComponentFixture<AdmRAPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmRAPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdmRAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
