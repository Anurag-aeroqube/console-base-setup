import { ReactNode } from 'react';
import DataTable from '@/components/data-management/DataTable';
import type { ListViewConfig, ListViewState } from '@/types/data-management';

interface ListViewProps<T = unknown> {
  config: ListViewConfig<T>;
  state: ListViewState;
  onRowSelect?: (rowIds: string[]) => void;
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  onRowClick?: (row: T) => void;
  emptyState?: ReactNode;
  loadingState?: ReactNode;
}

export default function ListView<T = unknown>({
  config,
  state,
  onRowSelect,
  onSort,
  onRowClick,
  emptyState,
  loadingState,
}: ListViewProps<T>) {
  if (state.loading) {
    return (
      <div className="flex items-center justify-center h-full">
        {loadingState || <div>Loading...</div>}
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="flex items-center justify-center h-full text-destructive">
        {state.error}
      </div>
    );
  }

  if (state.data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        {emptyState || <div>No data available</div>}
      </div>
    );
  }

  return (
    <div className="p-6">
      <DataTable
        columns={config.columns}
        data={state.data as T[]}
        selectedRows={state.selectedRows}
        sorting={state.sorting}
        onRowSelect={onRowSelect}
        onSort={onSort}
        onRowClick={onRowClick}
        bulkActions={config.bulkActions}
      />
    </div>
  );
}

