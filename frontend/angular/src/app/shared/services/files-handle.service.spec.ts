import { TestBed } from '@angular/core/testing';

import { FilesHandleService } from './files-handle.service';

describe('FilesHandleService', () => {
  let service: FilesHandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesHandleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
