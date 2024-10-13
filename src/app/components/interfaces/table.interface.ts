export interface TableColumn {
    header: string;
    field: string;
    sortable?: boolean;
    width?: string;
    expandable?: boolean;
  }
  
  export interface TableConfig {
    columns: TableColumn[];
    headerBackgroundColor?: string;
    headerTextColor?: string;
    rowBackgroundColor?: string;
    rowTextColor?: string;
  }
  
  export interface PaginationConfig {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }

  export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }