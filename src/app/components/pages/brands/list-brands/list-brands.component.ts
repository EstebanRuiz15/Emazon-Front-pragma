import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/components/interfaces/Ibrand';
import { PageResponse, TableConfig, PaginationConfig } from '../../../interfaces/table.interface';
import { ServiceBrandComponent } from 'src/app/services/service-brand/service-brand.component';
import { ASC, BLACK, DESC, Description, DESCRIPTION, ERROR, FIVE, Name, NAME, SERVICE_UNAVAILABLE, TEN, WHITE, ZERO } from 'src/app/shared/Constants';
import { ToastService } from 'src/app/services/toast/toast.service';
@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.scss']
})
export class ListBrandsComponent implements OnInit {
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

  brands: Brand[] = [];
  pagination: PaginationConfig = {
    currentPage: ZERO,
    pageSize: FIVE,
    totalItems: ZERO,
    totalPages: ZERO
  };
  sortField: string = NAME;
  sortOrder: typeof ASC | typeof DESC = ASC;
  errorMessage: string | null = null;

  constructor(private brandService: ServiceBrandComponent,
              private toastService:ToastService) {}

  ngOnInit() {
    this.loadBrands();
  }

  loadBrands() {

    this.brandService.getBrands(
      this.pagination.currentPage,
      this.pagination.pageSize,
      this.sortOrder
    ).subscribe({
      next: (response: PageResponse<Brand>) => {
        this.brands = response.content;
        this.pagination = {
          currentPage: response.number,
          pageSize: response.size,
          totalItems: response.totalElements,
          totalPages: response.totalPages
        };
        this.errorMessage = null;
      },
      error: (error) => {
        this.toastService.showToast(SERVICE_UNAVAILABLE,ERROR)
      }
    });
  }

  onPageChange(newPage: number) {
    this.pagination.currentPage = newPage;
    this.loadBrands();
  }

  onSortChange(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === ASC? DESC : ASC;
    } else {
      this.sortField = field;
      this.sortOrder = ASC;
    }
    this.pagination.currentPage = ZERO; 
    this.loadBrands();
  }

  onPageSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const newSize = parseInt(target.value, TEN);  
    this.pagination.pageSize = newSize;
    this.pagination.currentPage = ZERO; 
    this.loadBrands(); 
  }

}