import { ReactNode } from 'react';
import { useRBAC } from '@/contexts/RBACContext';
import { PermissionString, Role } from '@/types/rbac';

interface PermissionGateProps {
  children: ReactNode;
  permission?: PermissionString;
  role?: Role;
  roles?: Role[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

export default function PermissionGate({
  children,
  permission,
  role,
  roles,
  requireAll = false,
  fallback = null,
}: PermissionGateProps) {
  const { canAccess, hasRole, hasAnyRole, hasAllRoles } = useRBAC();

  // Check permission
  if (permission && !canAccess(permission)) {
    return <>{fallback}</>;
  }

  // Check single role
  if (role && !hasRole(role)) {
    return <>{fallback}</>;
  }

  // Check multiple roles
  if (roles && roles.length > 0) {
    const hasRequiredRoles = requireAll
      ? hasAllRoles(roles)
      : hasAnyRole(roles);
    
    if (!hasRequiredRoles) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}

