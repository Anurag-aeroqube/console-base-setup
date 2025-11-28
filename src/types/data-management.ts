import { ReactNode } from 'react';

// Data Management Type Definitions
export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

export interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: string | number | boolean | string[] | null | undefined;
}

export interface ListViewConfig<T = unknown> {
  columns: ColumnDefinition<T>[];
  filters?: FilterDefinition[];
  actions?: ActionDefinition[];
  bulkActions?: BulkActionDefinition[];
  pagination?: PaginationParams;
  sorting?: SortParams;
  defaultSort?: SortParams;
}

export interface ColumnDefinition<T = unknown> {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: unknown, row: T) => ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  permission?: string; // RBAC permission required to view column
}

export interface FilterDefinition {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'number' | 'boolean' | 'multiselect';
  options?: { label: string; value: string | number }[];
  placeholder?: string;
  permission?: string; // RBAC permission required to use filter
}

export interface ActionDefinition {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick: (row: unknown) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary';
  permission?: string; // RBAC permission required to perform action
  condition?: (row: unknown) => boolean; // Show/hide based on row data
}

export interface BulkActionDefinition {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick: (selectedRows: unknown[]) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary';
  permission?: string; // RBAC permission required to perform bulk action
}

export interface ListViewState {
  data: unknown[];
  loading: boolean;
  error: string | null;
  selectedRows: string[]; // IDs of selected rows
  filters: FilterParams;
  pagination: PaginationParams;
  sorting: SortParams | null;
}

