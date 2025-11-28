# Admin Panel Base Structure

This document describes the base structure for the admin panel/console with RBAC (Role-Based Access Control) and data management capabilities.

## 📁 File Structure

```
src/
├── types/
│   ├── rbac.ts              # RBAC type definitions (User, Role, Permission, etc.)
│   ├── data-management.ts   # Data management types (ListView, Filters, etc.)
│   └── common.ts            # Common types (ApiResponse, PaginatedResponse)
│
├── contexts/
│   └── RBACContext.tsx      # RBAC context provider and hook
│
├── hooks/
│   ├── useRBAC.ts           # RBAC hook for permissions and roles
│   ├── useDataManagement.ts # Data management hook (fetching, filtering, sorting)
│   └── usePagination.ts     # Pagination hook
│
├── lib/
│   ├── rbac.ts              # RBAC utility functions
│   └── utils.ts             # General utilities (cn function)
│
├── components/
│   ├── layout/
│   │   ├── AdminLayout.tsx  # Main admin layout (matches wireframe)
│   │   ├── AppBar.tsx       # Top app bar
│   │   ├── FiltersBar.tsx   # Filters and actions bar
│   │   ├── ListView.tsx     # Main list view component
│   │   └── PaginationFooter.tsx # Pagination footer
│   │
│   ├── rbac/
│   │   ├── ProtectedRoute.tsx    # Route-level protection
│   │   └── PermissionGate.tsx    # Component-level permission check
│   │
│   ├── data-management/
│   │   ├── DataTable.tsx         # Reusable data table
│   │   ├── FilterPanel.tsx       # Filter panel component
│   │   └── ActionBar.tsx        # Action buttons bar
│   │
│   └── ui/
│       ├── button.tsx            # Button component
│       ├── input.tsx             # Input component
│       └── checkbox.tsx           # Checkbox component
│
└── pages/
    └── admin/
        └── users/
            └── index.tsx          # Example users page
```

## 🚀 Setup Instructions

### 1. Install Dependencies

The checkbox component requires `@radix-ui/react-checkbox`. Install it:

```bash
npm install @radix-ui/react-checkbox
# or
yarn add @radix-ui/react-checkbox
```

### 2. Set Up RBAC Provider

Wrap your application with the `RBACProvider` in your root component (e.g., `App.tsx` or `main.tsx`):

```tsx
import { RBACProvider } from '@/contexts/RBACContext';
import { User } from '@/types/rbac';

// Example user data - replace with your actual user fetching logic
const user: User = {
  id: '1',
  email: 'admin@example.com',
  fullName: 'Admin User',
  roles: ['admin'],
  permissions: ['users:read', 'users:create', 'users:update', 'users:delete'],
};

function App() {
  return (
    <RBACProvider user={user} isLoading={false}>
      {/* Your app content */}
    </RBACProvider>
  );
}
```

### 3. Create Missing Dependencies

The following components are referenced but need to be created or adapted:

1. **Sidebar Components** (`@/components/ui/sidebar`)
   - The `AdminLayout` uses `SidebarProvider` and `SidebarInset`
   - You may need to create or import these from your existing sidebar implementation

2. **SideNavContainer** (`@/pages/sidenav/sideNavContainer`)
   - Navigation container component
   - Should render the left navigation bar

3. **Header Component** (`@/components/layout/header`)
   - App bar header component
   - Should display user info, theme toggle, etc.

### 4. Usage Examples

#### Protected Route

```tsx
import ProtectedRoute from '@/components/rbac/ProtectedRoute';

<Route
  path="/admin/users"
  element={
    <ProtectedRoute permission="users:read">
      <UsersPage />
    </ProtectedRoute>
  }
/>
```

#### Permission Gate

```tsx
import PermissionGate from '@/components/rbac/PermissionGate';

<PermissionGate permission="users:create">
  <Button>Create User</Button>
</PermissionGate>
```

#### Using Hooks

```tsx
import { useRBAC, usePermission } from '@/hooks/useRBAC';

function MyComponent() {
  const { user, canAccess } = useRBAC();
  const canCreate = usePermission('users:create');
  
  return (
    <div>
      {canCreate && <Button>Create</Button>}
    </div>
  );
}
```

#### Data Management Page

See `src/pages/admin/users/index.tsx` for a complete example of:
- Setting up filters
- Configuring columns
- Using the data management hook
- Integrating with the layout components

## 🔐 RBAC Permission Format

Permissions follow the format: `resource:action`

Examples:
- `users:read` - Read users
- `users:create` - Create users
- `users:update` - Update users
- `users:delete` - Delete users
- `users:*` - All user permissions (wildcard)

## 📋 Layout Structure

The layout matches the wireframe design:

1. **Left Navigation Bar** - Hierarchical navigation (nodes/leaves)
2. **App Bar** - Top header with user info and global actions
3. **Filters And Other Actions** - Filter controls and action buttons
4. **List View** - Main content area with data table
5. **Footer** - Pagination controls (page number, limit, next/previous)

## 🎨 Customization

### Adding New Filters

```tsx
const filters: FilterDefinition[] = [
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
    permission: 'users:read', // Optional RBAC check
  },
];
```

### Custom Column Rendering

```tsx
const columns: ColumnDefinition<User>[] = [
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <Badge variant={value === 'active' ? 'success' : 'default'}>
        {value}
      </Badge>
    ),
  },
];
```

### Bulk Actions

```tsx
const bulkActions: BulkActionDefinition[] = [
  {
    key: 'delete',
    label: 'Delete Selected',
    variant: 'destructive',
    permission: 'users:delete',
    onClick: (selectedRows) => {
      // Handle bulk delete
    },
  },
];
```

## 🔧 Next Steps

1. **Integrate with your API**: Update the `fetchData` function in `useDataManagement` to call your actual API endpoints
2. **Add authentication**: Integrate with your auth system to populate the user in `RBACProvider`
3. **Create resource pages**: Use the users page as a template for other resources
4. **Customize styling**: Adjust Tailwind classes to match your design system
5. **Add more filter types**: Extend `FilterPanel` to support date pickers, number ranges, etc.

## 📝 Notes

- All components are TypeScript-typed for better developer experience
- RBAC checks are performed at multiple levels (route, component, column, action)
- The data management hook handles loading states, errors, and data fetching
- Pagination, sorting, and filtering are all integrated and work together
- Components are designed to be reusable across different resources

