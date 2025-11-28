import type { PaginationParams } from '@/types/data-management';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationFooterProps {
  pagination: PaginationParams;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  limits?: number[];
}

export default function PaginationFooter({
  pagination,
  onPageChange,
  onLimitChange,
  limits = [10, 25, 50, 100],
}: PaginationFooterProps) {
  const { page, limit, total } = pagination;
  const totalPages = Math.ceil(total / limit);
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="border-t bg-background px-6 py-4 flex items-center justify-between">
      {/* Items per page */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Items per page:</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
        >
          {limits.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* Page info */}
      <div className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {total} entries
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex items-center gap-1">
          <span className="text-sm">Page</span>
          <Input
            type="number"
            min={1}
            max={totalPages}
            value={page}
            onChange={(e) => {
              const newPage = Number(e.target.value);
              if (newPage >= 1 && newPage <= totalPages) {
                onPageChange(newPage);
              }
            }}
            className="w-16 h-9 text-center"
          />
          <span className="text-sm">of {totalPages}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

