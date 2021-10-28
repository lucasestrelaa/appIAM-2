import { TestBed } from '@angular/core/testing';

import { ContVotoService } from './cont-voto.service';

describe('ContVotoService', () => {
  let service: ContVotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContVotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
