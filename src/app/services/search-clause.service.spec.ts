import { TestBed } from '@angular/core/testing';

import { SearchClauseService } from './search-clause.service';

describe('SearchClauseService', () => {
  let service: SearchClauseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchClauseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
