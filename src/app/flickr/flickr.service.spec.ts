/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FlickrService } from './flickr.service';

describe('Service: Flickr', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlickrService]
    });
  });

  it('should ...', inject([FlickrService], (service: FlickrService) => {
    expect(service).toBeTruthy();
  }));
});
