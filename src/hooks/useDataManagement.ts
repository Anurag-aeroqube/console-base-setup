import { useState, useCallback, useEffect } from 'react';
import { ListViewState, FilterParams, SortParams, PaginationParams } from '@/types/data-management';

interface UseDataManagementOptions {
  initialFilters?: FilterParams;
  initialSort?: SortParams | null;
  initialPagination?: PaginationParams;
  fetchData: (params: {
    filters: FilterParams;
    sort: SortParams | null;
    pagination: PaginationParams;
  }) => Promise<{ data: unknown[]; total: number }>;
}

export function useDataManagement({
  initialFilters = {},
  initialSort = null,
  initialPagination = { page: 1, limit: 10, total: 0 },
  fetchData,
}: UseDataManagementOptions) {
  const [state, setState] = useState<ListViewState>({
    data: [],
    loading: false,
    error: null,
    selectedRows: [],
    filters: initialFilters,
    pagination: initialPagination,
    sorting: initialSort,
  });

  const loadData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await fetchData({
        filters: state.filters,
        sort: state.sorting,
        pagination: state.pagination,
      });
      setState(prev => ({
        ...prev,
        data: result.data,
        pagination: { ...prev.pagination, total: result.total },
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  }, [state.filters, state.sorting, state.pagination, fetchData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const setFilters = useCallback((filters: FilterParams) => {
    setState(prev => ({
      ...prev,
      filters,
      pagination: { ...prev.pagination, page: 1 }, // Reset to first page
    }));
  }, []);

  const setSorting = useCallback((sorting: SortParams | null) => {
    setState(prev => ({ ...prev, sorting }));
  }, []);

  const setPagination = useCallback((pagination: Partial<PaginationParams>) => {
    setState(prev => ({
      ...prev,
      pagination: { ...prev.pagination, ...pagination },
    }));
  }, []);

  const setSelectedRows = useCallback((selectedRows: string[]) => {
    setState(prev => ({ ...prev, selectedRows }));
  }, []);

  return {
    state,
    setFilters,
    setSorting,
    setPagination,
    setSelectedRows,
    reload: loadData,
  };
}

