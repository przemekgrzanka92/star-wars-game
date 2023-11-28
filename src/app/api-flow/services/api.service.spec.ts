import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get person data', () => {
    const mockPerson = { name: 'Luke Skywalker', height: '172', mass: '77' };

    service.getPerson('1').subscribe((person) => {
      expect(person).toEqual(mockPerson);
    });

    const req = httpTestingController.expectOne(
      `${service['apiUrl']}/people/1`,
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockPerson);
  });

  it('should get starship data', () => {
    const mockStarship = { name: 'X-wing', crew: '1' };

    service.getStarship('1').subscribe((starship) => {
      expect(starship).toEqual(mockStarship);
    });

    const req = httpTestingController.expectOne(
      `${service['apiUrl']}/starships/1`,
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockStarship);
  });
});
