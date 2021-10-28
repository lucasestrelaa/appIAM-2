import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResSorteiosPage } from './res-sorteios.page';

describe('ResSorteiosPage', () => {
  let component: ResSorteiosPage;
  let fixture: ComponentFixture<ResSorteiosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResSorteiosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResSorteiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
