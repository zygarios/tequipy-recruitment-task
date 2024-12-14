import { TestBed } from '@angular/core/testing';

import { OffboardDialogService } from './offboard-dialog.service';

describe('OffboardDialogService', () => {
  let service: OffboardDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffboardDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
