import { TestBed } from '@angular/core/testing';

import { ContVotoRaService } from './cont-voto-ra.service';

describe('ContVotoRaService', () => {
  let service: ContVotoRaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContVotoRaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
