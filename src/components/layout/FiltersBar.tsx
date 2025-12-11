// import type { ReactNode } from 'react';
import { useRBAC } from '@/contexts/RBACContext';
import { filterByPermission } from '@/lib/rbac';
import type { FilterDefinition, ActionDefinition } from '@/types/data-management';
import FilterPanel from '@/components/dataManagement/FilterPanel';
import ActionBar from '@/components/dataManagement/ActionBar';

interface FiltersBarProps {
  filters?: FilterDefinition[];
  actions?: ActionDefinition[];
  onFilterChange?: (filters: Record<string, unknown>) => void;
  onActionClick?: (actionKey: string) => void;
}

export default function FiltersBar({
  filters = [],
  actions = [],
  onFilterChange,
  onActionClick,
}: FiltersBarProps) {
  const { user } = useRBAC();
  
  // Filter by permissions
  const visibleFilters = filterByPermission(filters, user);
  const visibleActions = filterByPermission(actions, user);

  return (
    <div className=" bg-background px-6  flex items-center justify-between gap-4">
      {visibleFilters.length > 0 && (
        <FilterPanel
          filters={visibleFilters}
          onChange={onFilterChange}
        />
      )}
      {visibleActions.length > 0 && (
        <ActionBar
          actions={visibleActions}
          onClick={onActionClick}
        />
      )}
    </div>
  );
}

