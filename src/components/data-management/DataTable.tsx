import { useState, useEffect } from 'react';
import { useRBAC } from '@/contexts/RBACContext';
import { filterByPermission } from '@/lib/rbac';
import { ColumnDefinition, BulkActionDefinition } from '@/types/data-management';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUpDown } from 'lucide-react';

interface DataTableProps<T = unknown> {
  columns: ColumnDefinition<T>[];
  data: T[];
  selectedRows?: string[];
  sorting?: { field: string; direction: 'asc' | 'desc' } | null;
  onRowSelect?: (rowIds: string[]) => void;
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  onRowClick?: (row: T) => void;
  bulkActions?: BulkActionDefinition[];
  getRowId?: (row: T) => string;
}

export default function DataTable<T = unknown>({
  columns,
  data,
  selectedRows = [],
  sorting,
  onRowSelect,
  onSort,
  onRowClick,
  bulkActions = [],
  getRowId = (row: T) => (row as { id: string }).id,
}: DataTableProps<T>) {
  const { user } = useRBAC();
  const [selected, setSelected] = useState<string[]>(selectedRows);

  // Sync selected rows with prop
  useEffect(() => {
    setSelected(selectedRows);
  }, [selectedRows]);

  // Filter columns by permission
  const visibleColumns = filterByPermission(columns, user);
  const visibleBulkActions = filterByPermission(bulkActions, user);

  const handleSelectAll = (checked: boolean) => {
    const allIds = data.map(getRowId);
    const newSelected = checked ? allIds : [];
    setSelected(newSelected);
    onRowSelect?.(newSelected);
  };

  const handleSelectRow = (rowId: string, checked: boolean) => {
    const newSelected = checked
      ? [...selected, rowId]
      : selected.filter(id => id !== rowId);
    setSelected(newSelected);
    onRowSelect?.(newSelected);
  };

  const handleSort = (field: string) => {
    if (!onSort) return;
    const direction = sorting?.field === field && sorting.direction === 'asc'
      ? 'desc'
      : 'asc';
    onSort(field, direction);
  };

  const isAllSelected = selected.length === data.length && data.length > 0;
  const isIndeterminate = selected.length > 0 && selected.length < data.length;

  return (
    <div className="w-full">
      {/* Bulk Actions Bar */}
      {selected.length > 0 && visibleBulkActions.length > 0 && (
        <div className="mb-4 p-2 bg-muted rounded-md flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {selected.length} selected
          </span>
          {visibleBulkActions.map((action) => (
            <Button
              key={action.key}
              variant={action.variant || 'outline'}
              size="sm"
              onClick={() => {
                const selectedData = data.filter(row => 
                  selected.includes(getRowId(row))
                );
                action.onClick(selectedData);
              }}
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="border rounded-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {onRowSelect && (
                <th className="w-12 p-4">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    ref={(el) => {
                      if (el) {
                        el.indeterminate = isIndeterminate;
                      }
                    }}
                  />
                </th>
              )}
              {visibleColumns.map((column) => (
                <th
                  key={column.key}
                  className="p-4 text-left font-medium"
                  style={{ width: column.width }}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => handleSort(column.key)}
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const rowId = getRowId(row);
              return (
                <tr
                  key={rowId}
                  className="border-t hover:bg-muted/50 cursor-pointer"
                  onClick={() => onRowClick?.(row)}
                >
                  {onRowSelect && (
                    <td className="p-4">
                      <Checkbox
                        checked={selected.includes(rowId)}
                        onCheckedChange={(checked) =>
                          handleSelectRow(rowId, checked as boolean)
                        }
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}
                  {visibleColumns.map((column) => (
                    <td
                      key={column.key}
                      className="p-4"
                      style={{ textAlign: column.align || 'left' }}
                    >
                      {column.render
                        ? column.render((row as Record<string, unknown>)[column.key], row)
                        : String((row as Record<string, unknown>)[column.key] ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

