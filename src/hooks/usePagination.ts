import { useState, useMemo } from 'react';
import { PaginationParams } from '@/types/data-management';

export function usePagination(initialLimit = 10) {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: initialLimit,
    total: 0,
  });

  const totalPages = useMemo(
    () => Math.ceil(pagination.total / pagination.limit),
    [pagination.total, pagination.limit]
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPagination(prev => ({ ...prev, page }));
    }
  };

  const nextPage = () => goToPage(pagination.page + 1);
  const previousPage = () => goToPage(pagination.page - 1);
  const firstPage = () => goToPage(1);
  const lastPage = () => goToPage(totalPages);

  const setLimit = (limit: number) => {
    setPagination(prev => ({ ...prev, limit, page: 1 }));
  };

  return {
    pagination,
    totalPages,
    goToPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    setLimit,
    setPagination,
  };
}

