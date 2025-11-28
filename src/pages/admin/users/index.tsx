import { useDataManagement } from '@/hooks/useDataManagement';
import AdminLayout from '@/components/layout/AdminLayout';
import ListView from '@/components/layout/ListView';
import FiltersBar from '@/components/layout/FiltersBar';
import PaginationFooter from '@/components/layout/PaginationFooter';
import { ListViewConfig } from '@/types/data-management';
import { User } from '@/types/rbac';

const columns: ListViewConfig<User>['columns'] = [
  {
    key: 'id',
    label: 'ID',
    sortable: true,
  },
  {
    key: 'fullName',
    label: 'Name',
    sortable: true,
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
  },
  {
    key: 'roles',
    label: 'Roles',
    render: (value) => (value as string[]).join(', '),
  },
];

const filters: ListViewConfig<User>['filters'] = [
  {
    key: 'search',
    label: 'Search',
    type: 'text',
    placeholder: 'Search users...',
  },
  {
    key: 'role',
    label: 'Role',
    type: 'select',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ],
  },
];

const actions: ListViewConfig<User>['actions'] = [
  {
    key: 'create',
    label: 'Create User',
    permission: 'users:create',
    onClick: () => console.log('Create user'),
  },
];

export default function UsersPage() {
  const {
    state,
    setFilters,
    setSorting,
    setPagination,
    setSelectedRows,
  } = useDataManagement({
    fetchData: async ({ filters, sort, pagination }) => {
      // Replace with your API call
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filters, sort, pagination }),
      });
      const result = await response.json();
      return {
        data: result.data,
        total: result.pagination.total,
      };
    },
  });

  return (
    <AdminLayout>
      <FiltersBar
        filters={filters}
        actions={actions}
        onFilterChange={setFilters}
      />
      <ListView
        config={{ columns, filters, actions }}
        state={state}
        onRowSelect={setSelectedRows}
        onSort={(field, direction) =>
          setSorting({ field, direction })
        }
      />
      <PaginationFooter
        pagination={state.pagination}
        onPageChange={(page) => setPagination({ page })}
        onLimitChange={(limit) => setPagination({ limit, page: 1 })}
      />
    </AdminLayout>
  );
}

