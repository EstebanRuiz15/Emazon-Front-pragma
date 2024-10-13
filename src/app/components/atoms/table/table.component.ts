import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableConfig, PaginationConfig } from '../../interfaces/table.interface';
import { ASC, AUTO, DEFAULT_WIDTH, DESC } from 'src/app/shared/Constants';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() config!: TableConfig;
  @Input() data: any[] = [];
  @Input() pagination!: PaginationConfig;
  @Input() sortField!: string;
  @Input() sortOrder!: typeof ASC | typeof DESC;
  @Output() pageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  @Input() customWidth: string = DEFAULT_WIDTH; 
  @Input() customHeight: string = AUTO; 
  @Input() customClass: string = '';

  onPageChange(newPage: number) {
    if (newPage >= 0 && newPage < this.pagination.totalPages) {
      this.pageChange.emit(newPage);
    }
  }

  onSortChange(field: string) {
    this.sortChange.emit(field);
  }

  getSortIcon(field: string): string {
    if (this.sortField !== field) return 'fas fa-sort';
    return this.sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  }
}