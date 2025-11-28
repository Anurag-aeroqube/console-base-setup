import { useState } from 'react';
import type { FilterDefinition } from '@/types/data-management';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterDefinition[];
  onChange?: (filters: Record<string, unknown>) => void;
}

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({});

  const handleFilterChange = (key: string, value: unknown) => {
    const newFilters = { ...filterValues, [key]: value };
    setFilterValues(newFilters);
    onChange?.(newFilters);
  };

  const handleClearFilter = (key: string) => {
    const newFilters = { ...filterValues };
    delete newFilters[key];
    setFilterValues(newFilters);
    onChange?.(newFilters);
  };

  const handleClearAll = () => {
    setFilterValues({});
    onChange?.({});
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filters.map((filter) => (
        <div key={filter.key} className="flex items-center gap-2">
          {filter.type === 'text' && (
            <Input
              placeholder={filter.placeholder || filter.label}
              value={String(filterValues[filter.key] || '')}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className="w-48"
            />
          )}
          {filter.type === 'select' && (
            <select
              value={String(filterValues[filter.key] || '')}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm w-48"
            >
              <option value="">All {filter.label}</option>
              {filter.options?.map((option) => (
                <option key={option.value} value={String(option.value)}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          {filterValues[filter.key] as string && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleClearFilter(filter.key)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      {Object.keys(filterValues).length > 0 && (
        <Button variant="outline" size="sm" onClick={handleClearAll}>
          Clear All
        </Button>
      )}
    </div>
  );
}

