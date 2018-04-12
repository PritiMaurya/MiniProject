import { TestBed, inject } from '@angular/core/testing';

import { ManageHotelService } from './manage-hotel.service';

describe('ManageHotelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageHotelService]
    });
  });

  it('should be created', inject([ManageHotelService], (service: ManageHotelService) => {
    expect(service).toBeTruthy();
  }));
});
