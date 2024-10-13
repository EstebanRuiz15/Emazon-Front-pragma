import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category';
import { PageResponse, TableConfig, PaginationConfig } from '../../interfaces/table.interface';
import { ServiceCategoryComponent } from 'src/app/services/service-category/service-category.component';
import { ASC, BLACK, DESC, Description, DESCRIPTION, ERROR, FIVE, Name, NAME, SERVICE_UNAVAILABLE, TEN, WHITE, ZERO } from 'src/app/shared/Constants';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  tableConfig: TableConfig = {
    columns: [
      { header: Name, field: NAME, sortable: true, width: '200px' },
      { header: Description, field: DESCRIPTION, sortable: false}
    ],
    headerBackgroundColor: '#45269E',
    headerTextColor: WHITE,
    rowBackgroundColor: WHITE,
    rowTextColor: BLACK
  };

  categories: Category[] = [];
  pagination: PaginationConfig = {
    currentPage: ZERO,
    pageSize: FIVE,
    totalItems: ZERO,
    totalPages: ZERO
  };
  sortField: string = NAME;
  sortOrder: typeof ASC | typeof DESC = ASC;
  errorMessage: string | null = null;

  constructor(private categoryService: ServiceCategoryComponent,
              private toasService:ToastService
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {

    this.categoryService.getCategories(
      this.pagination.currentPage,
      this.pagination.pageSize,
      this.sortOrder
    ).subscribe({
      next: (response: PageResponse<Category>) => {
        this.categories = response.content;
        this.pagination = {
          currentPage: response.number,
          pageSize: response.size,
          totalItems: response.totalElements,
          totalPages: response.totalPages
        };
        this.errorMessage = null;
      },
      error: (error) => {
        this.toasService.showToast(SERVICE_UNAVAILABLE,ERROR);
      }
    });
  }

  onPageChange(newPage: number) {
    this.pagination.currentPage = newPage;
    this.loadCategories();
  }

  onSortChange(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === ASC? DESC : ASC;
    } else {
      this.sortField = field;
      this.sortOrder = ASC;
    }
    this.pagination.currentPage = ZERO; 
    this.loadCategories();
  }

  onPageSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const newSize = parseInt(target.value, TEN);  
    this.pagination.pageSize = newSize;
    this.pagination.currentPage = ZERO; 
    this.loadCategories(); 
  }

}