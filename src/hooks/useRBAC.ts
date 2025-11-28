import { useRBAC as useRBACContext } from '@/contexts/RBACContext';
import { PermissionString, Role } from '@/types/rbac';

export function useRBAC() {
  return useRBACContext();
}

export function usePermission(permission: PermissionString) {
  const { canAccess } = useRBACContext();
  return canAccess(permission);
}

export function useRole(role: Role) {
  const { hasRole } = useRBACContext();
  return hasRole(role);
}

