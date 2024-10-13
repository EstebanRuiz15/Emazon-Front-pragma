import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ListCategoriesComponent } from './list-categories.component';
import { ServiceCategoryComponent } from 'src/app/services/service-category/service-category.component';
import { Category } from '../../interfaces/category';
import { PageResponse } from '../../interfaces/table.interface';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ASC, BLACK, DESC, Description, DESCRIPTION, FIVE, Name, NAME, SERVICE_UNAVAILABLE, TEN, WHITE, ZERO } from 'src/app/shared/Constants';

describe('ListCategoriesComponent', () => {
  let component: ListCategoriesComponent;
  let fixture: ComponentFixture<ListCategoriesComponent>;
  let categoryServiceMock: jest.Mocked<ServiceCategoryComponent>;

  const mockCategoriesResponse: PageResponse<Category> = {
    content: [
      { name: 'Category 1', description: 'Description 1' },
      { name: 'Category 2', description: 'Description 2' }
    ],
    number: 0,
    size: 5,
    totalElements: 10,
    totalPages: 2
  };

  beforeEach(async () => {
    categoryServiceMock = {
      getCategories: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [ListCategoriesComponent],
      imports: [
        CommonModule,
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ServiceCategoryComponent, useValue: categoryServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCategoriesComponent);
    component = fixture.componentInstance;
    categoryServiceMock.getCategories.mockReturnValue(of(mockCategoriesResponse));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize with correct table configuration', () => {
    expect(component.tableConfig.columns[0].header).toBe(Name);
    expect(component.tableConfig.columns[0].field).toBe(NAME);
    expect(component.tableConfig.columns[0].sortable).toBeTruthy();
    expect(component.tableConfig.columns[1].header).toBe(Description);
    expect(component.tableConfig.columns[1].sortable).toBeFalsy();
    expect(component.tableConfig.headerBackgroundColor).toBe('#45269E');
    expect(component.tableConfig.headerTextColor).toBe(WHITE);
  });

  it('should load categories on init', () => {
    fixture.detectChanges();
    
    expect(categoryServiceMock.getCategories).toHaveBeenCalledWith(
      ZERO,
      FIVE,
      ASC
    );
    expect(component.categories).toEqual(mockCategoriesResponse.content);
    expect(component.pagination.totalItems).toBe(mockCategoriesResponse.totalElements);
    expect(component.errorMessage).toBeNull();
  });

  it('should handle error when loading categories', () => {
    categoryServiceMock.getCategories.mockReturnValue(throwError(() => new Error()));
    fixture.detectChanges();

    expect(component.errorMessage).toBe(SERVICE_UNAVAILABLE);
    expect(component.categories).toEqual([]);
  });

  it('should change page and reload categories', () => {
    fixture.detectChanges();
    const mockNewPageResponse = {
      ...mockCategoriesResponse,
      number: 1
    };
    categoryServiceMock.getCategories.mockReturnValue(of(mockNewPageResponse));
    
    component.onPageChange(1);
    expect(categoryServiceMock.getCategories).toHaveBeenCalledWith(
      1,
      FIVE,
      component.sortOrder
    );
    fixture.detectChanges();

    expect(component.pagination.currentPage).toBe(mockNewPageResponse.number);
  });

  it('should change sort order when clicking on same field', () => {
    fixture.detectChanges();
    
    component.onSortChange(NAME);
    expect(component.sortOrder).toBe(DESC);
    
    component.onSortChange(NAME);
    expect(component.sortOrder).toBe(ASC);
    
    expect(categoryServiceMock.getCategories).toHaveBeenCalledTimes(3); // Initial load + 2 sort changes
  });

  it('should change sort field and reset order when clicking on different field', () => {
    fixture.detectChanges();
    
    component.sortField = DESCRIPTION;
    component.sortOrder = DESC;
    
    component.onSortChange(NAME);
    
    expect(component.sortField).toBe(NAME);
    expect(component.sortOrder).toBe(ASC);
    expect(component.pagination.currentPage).toBe(ZERO);
  });

   it('should change page size and reload categories', () => {
    fixture.detectChanges();
    const mockNewSizeResponse: PageResponse<Category> = {
      ...mockCategoriesResponse,
      size: 10
    };
    categoryServiceMock.getCategories.mockReturnValue(of(mockNewSizeResponse));
    
    const event = { target: { value: '10' } } as any;
    component.onPageSizeChange(event);

    expect(categoryServiceMock.getCategories).toHaveBeenCalledWith(
      ZERO,
      10,
      component.sortOrder
    );
    fixture.detectChanges();
    expect(component.pagination.pageSize).toBe(mockNewSizeResponse.size);
    expect(component.pagination.currentPage).toBe(ZERO);
  });

  it('should reset to first page when changing sort or page size', () => {
    fixture.detectChanges();
    component.pagination.currentPage = 1;
    
    component.onSortChange(NAME);
    expect(component.pagination.currentPage).toBe(ZERO);
    
    component.pagination.currentPage = 1;
    const event = { target: { value: '10' } } as any;
    component.onPageSizeChange(event);
    expect(component.pagination.currentPage).toBe(ZERO);
  });
});