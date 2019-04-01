import { TestBed } from '@angular/core/testing';

import { Sample.ServiceService } from './sample.service.service';

describe('Sample.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Sample.ServiceService = TestBed.get(Sample.ServiceService);
    expect(service).toBeTruthy();
  });
});
