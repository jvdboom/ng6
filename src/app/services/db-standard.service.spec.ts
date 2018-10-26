import { TestBed } from '@angular/core/testing';

import { DBStandardService } from './db-standard.service';

describe('DBStandardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DBStandardService = TestBed.get(DBStandardService);
    expect(service).toBeTruthy();
  });
});
