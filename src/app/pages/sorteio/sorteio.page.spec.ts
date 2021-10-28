import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SorteioPage } from './sorteio.page';

describe('SorteioPage', () => {
  let component: SorteioPage;
  let fixture: ComponentFixture<SorteioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorteioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SorteioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
