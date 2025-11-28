import { Navigate, useLocation } from 'react-router-dom';
import { useRBAC } from '@/contexts/RBACContext';
import { PermissionString, Role } from '@/types/rbac';

interface ProtectedRouteProps {
  children: React.ReactNode;
  permission?: PermissionString;
  role?: Role;
  roles?: Role[];
  requireAll?: boolean; // If true, requires all roles; if false, requires any role
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  permission,
  role,
  roles,
  requireAll = false,
  redirectTo = '/dashboard',
}: ProtectedRouteProps) {
  const { canAccess, hasRole, hasAnyRole, hasAllRoles, isAuthenticated } = useRBAC();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check permission
  if (permission && !canAccess(permission)) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check single role
  if (role && !hasRole(role)) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check multiple roles
  if (roles && roles.length > 0) {
    const hasRequiredRoles = requireAll
      ? hasAllRoles(roles)
      : hasAnyRole(roles);
    
    if (!hasRequiredRoles) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  return <>{children}</>;
}

