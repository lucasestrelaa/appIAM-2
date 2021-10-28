import { TestBed } from '@angular/core/testing';

import { ContVotoProfissaoService } from './cont-voto-profissao.service';

describe('ContVotoProfissaoService', () => {
  let service: ContVotoProfissaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContVotoProfissaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
