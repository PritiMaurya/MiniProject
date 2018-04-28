import { TestBed, inject } from '@angular/core/testing';

import { FormateDateService } from './formate-date.service';

describe('FormateDateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormateDateService]
    });
  });

  it('should be created', inject([FormateDateService], (service: FormateDateService) => {
    expect(service).toBeTruthy();
  }));
});
