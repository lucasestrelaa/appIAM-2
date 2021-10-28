import { TestBed } from '@angular/core/testing';

import { AdmProfissaoService } from './adm-profissao.service';

describe('AdmProfissaoService', () => {
  let service: AdmProfissaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmProfissaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
