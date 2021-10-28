import { TestBed } from '@angular/core/testing';

import { AdmRAService } from './adm-ra.service';

describe('AdmRAService', () => {
  let service: AdmRAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmRAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
