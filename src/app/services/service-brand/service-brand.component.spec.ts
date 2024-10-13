import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceBrandComponent } from './service-brand.component';
import { URL_BRAND } from 'src/app/shared/Constants';
import { Category } from 'src/app/components/interfaces/category';
import { PageResponse } from 'src/app/components/interfaces/table.interface';
import { TimeoutError } from 'rxjs';
import { Brand } from 'src/app/components/interfaces/Ibrand';

describe('ServiceBrandComponent', () => {
  let service: ServiceBrandComponent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceBrandComponent]
    });

    service = TestBed.inject(ServiceBrandComponent);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createBrand', () => {
    it('should create a brand successfully', (done) => {
      const mockName = 'Test Brand';
      const mockDescription = 'Test Description';
      const mockResponse = { id: 1, name: mockName, description: mockDescription };

      service.createBrand(mockName, mockDescription).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
          done();
        }
      });

      const req = httpMock.expectOne(URL_BRAND);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ name: mockName, description: mockDescription });
      
      req.flush(mockResponse);
    });

    it('should timeout after 2000ms', (done) => {
      service.createBrand('Test', 'Description').subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(TimeoutError);
          done();
        }
      });
      
      jest.advanceTimersByTime(501);
      
      httpMock.expectOne(URL_BRAND);
    });
  });

  describe('getBrands', () => {
    it('should get brands with default parameters', (done) => {
      const mockApiResponse = {
        brands: [{ name: 'Brand 1', description: 'Description 1' }],
        totalData: 1,
        totalPages: 1,
        size: 10,
        currentPage: 0
      };

      const expectedResponse: PageResponse<Brand> = {
        content: mockApiResponse.brands,
        totalElements: mockApiResponse.totalData,
        totalPages: mockApiResponse.totalPages,
        size: mockApiResponse.size,
        number: mockApiResponse.currentPage
      };

      service.getBrands().subscribe({
        next: (response) => {
          expect(response).toEqual(expectedResponse);
          done();
        }
      });

      const req = httpMock.expectOne(`${URL_BRAND}?page=0&size=10&orden=`);
      expect(req.request.method).toBe('GET');
      
      req.flush(mockApiResponse);
    });

    it('should get brands with custom parameters', (done) => {
      const page = 1;
      const size = 5;
      const order = 'DESC';

      const mockApiResponse = {
        brands: [{ name: 'brand 1', description: 'Description 1' }],
        totalData: 10,
        totalPages: 2,
        size: 5,
        currentPage: 1
      };

      service.getBrands(page, size, order).subscribe({
        next: (response) => {
          expect(response.number).toBe(page);
          expect(response.size).toBe(size);
          done();
        }
      });

      const req = httpMock.expectOne(`${URL_BRAND}?page=1&size=5&orden=DESC`);
      expect(req.request.method).toBe('GET');
      
      req.flush(mockApiResponse);
    });

    it('should timeout after 2000ms', (done) => {
      service.getBrands().subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(TimeoutError);
          done();
        }
      });
      jest.advanceTimersByTime(501);
      
      httpMock.expectOne(`${URL_BRAND}?page=0&size=10&orden=`);
    });
  });
});