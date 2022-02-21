import { TestBed } from '@angular/core/testing';

import { GetByIdService } from './get-by-id.service';

describe('GetByIdService', () => {
  let service: GetByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
