import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceCategoryComponent } from './service-category.component';
import { URL_CREATE_CATEGORI, URL_GET_CATEGORIES } from 'src/app/shared/Constants';
import { Category } from 'src/app/components/interfaces/category';
import { PageResponse } from 'src/app/components/interfaces/table.interface';
import { TimeoutError } from 'rxjs';

describe('ServiceCategoryComponent', () => {
  let service: ServiceCategoryComponent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceCategoryComponent]
    });

    service = TestBed.inject(ServiceCategoryComponent);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createCategory', () => {
    it('should create a category successfully', (done) => {
      const mockName = 'Test Category';
      const mockDescription = 'Test Description';
      const mockResponse = { id: 1, name: mockName, description: mockDescription };

      service.createCategory(mockName, mockDescription).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
          done();
        }
      });

      const req = httpMock.expectOne(URL_CREATE_CATEGORI);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ name: mockName, description: mockDescription });
      
      req.flush(mockResponse);
    });

    it('should timeout after 500ms', (done) => {
      service.createCategory('Test', 'Description').subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(TimeoutError);
          done();
        }
      });
      
      jest.advanceTimersByTime(501);
      
      httpMock.expectOne(URL_CREATE_CATEGORI);
    });
  });

  describe('getCategories', () => {
    it('should get categories with default parameters', (done) => {
      const mockApiResponse = {
        category: [{ name: 'Category 1', description: 'Description 1' }],
        totalData: 1,
        totalPages: 1,
        size: 10,
        currentPage: 0
      };

      const expectedResponse: PageResponse<Category> = {
        content: mockApiResponse.category,
        totalElements: mockApiResponse.totalData,
        totalPages: mockApiResponse.totalPages,
        size: mockApiResponse.size,
        number: mockApiResponse.currentPage
      };

      service.getCategories().subscribe({
        next: (response) => {
          expect(response).toEqual(expectedResponse);
          done();
        }
      });

      const req = httpMock.expectOne(`${URL_GET_CATEGORIES}?page=0&size=10&orden=`);
      expect(req.request.method).toBe('GET');
      
      req.flush(mockApiResponse);
    });

    it('should get categories with custom parameters', (done) => {
      const page = 1;
      const size = 5;
      const order = 'DESC';

      const mockApiResponse = {
        category: [{ name: 'Category 1', description: 'Description 1' }],
        totalData: 10,
        totalPages: 2,
        size: 5,
        currentPage: 1
      };

      service.getCategories(page, size, order).subscribe({
        next: (response) => {
          expect(response.number).toBe(page);
          expect(response.size).toBe(size);
          done();
        }
      });

      const req = httpMock.expectOne(`${URL_GET_CATEGORIES}?page=1&size=5&orden=DESC`);
      expect(req.request.method).toBe('GET');
      
      req.flush(mockApiResponse);
    });

    it('should timeout after 500ms', (done) => {
      service.getCategories().subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(TimeoutError);
          done();
        }
      });
      jest.advanceTimersByTime(501);
      
      httpMock.expectOne(`${URL_GET_CATEGORIES}?page=0&size=10&orden=`);
    });
  });
});