import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { TableConfig, PaginationConfig } from '../../interfaces/table.interface';
import { ASC, AUTO, DEFAULT_WIDTH, DESC } from 'src/app/shared/Constants';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.config = {} as TableConfig;
    component.pagination = {
      currentPage: 0,
      totalPages: 5,
      totalItems: 50
    } as PaginationConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.data).toEqual([]);
    expect(component.customWidth).toBe(DEFAULT_WIDTH);
    expect(component.customHeight).toBe(AUTO);
    expect(component.customClass).toBe('');
  });

  describe('onPageChange', () => {
    it('should emit pageChange event when new page is valid', () => {
      const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');
      component.onPageChange(2);
      expect(pageChangeSpy).toHaveBeenCalledWith(2);
    });

    it('should not emit pageChange event when new page is less than 0', () => {
      const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');
      component.onPageChange(-1);
      expect(pageChangeSpy).not.toHaveBeenCalled();
    });

    it('should not emit pageChange event when new page is greater than or equal to totalPages', () => {
      const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');
      component.onPageChange(5);
      expect(pageChangeSpy).not.toHaveBeenCalled();
    });
  });

  describe('onSortChange', () => {
    it('should emit sortChange event with the provided field', () => {
      const sortChangeSpy = jest.spyOn(component.sortChange, 'emit');
      component.onSortChange('name');
      expect(sortChangeSpy).toHaveBeenCalledWith('name');
    });
  });

  describe('getSortIcon', () => {
    it('should return default sort icon when field is not the current sort field', () => {
      component.sortField = 'name';
      expect(component.getSortIcon('age')).toBe('fas fa-sort');
    });

    it('should return ascending sort icon when field is the current sort field and order is ASC', () => {
      component.sortField = 'name';
      component.sortOrder = ASC;
      expect(component.getSortIcon('name')).toBe('fas fa-sort-up');
    });

    it('should return descending sort icon when field is the current sort field and order is DESC', () => {
      component.sortField = 'name';
      component.sortOrder = DESC;
      expect(component.getSortIcon('name')).toBe('fas fa-sort-down');
    });
  });
});