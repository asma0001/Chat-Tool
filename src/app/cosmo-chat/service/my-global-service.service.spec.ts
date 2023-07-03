import { TestBed } from '@angular/core/testing';

import { MyGlobalService } from './my-global-service.service';

describe('MyGlobalServiceService', () => {
  let service: MyGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
