import { type User, type Role, type PermissionString } from '@/types/rbac';

/**
 * Check if user has a specific permission
 * Format: "resource:action" (e.g., "users:create", "users:read")
 */
export function checkPermission(user: User | null, permission: PermissionString): boolean {
  if (!user) return false;
  
  // Direct permission check
  if (user.permissions.includes(permission)) {
    return true;
  }

  // Wildcard permission check (e.g., "users:*" grants all user permissions)
  const [resource, _] = permission.split(':');
  const wildcardPermission = `${resource}:*`;
  if (user.permissions.includes(wildcardPermission)) {
    return true;
  }

  // Admin role typically has all permissions
  if (user.roles.includes('admin') || user.roles.includes('super_admin')) {
    return true;
  }

  return false;
}

/**
 * Check if user has a specific role
 */
export function checkRole(user: User | null, role: Role): boolean {
  if (!user) return false;
  return user.roles.includes(role);
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(user: User | null, roles: Role[]): boolean {
  if (!user) return false;
  return roles.some(role => user.roles.includes(role));
}

/**
 * Check if user has all of the specified roles
 */
export function hasAllRoles(user: User | null, roles: Role[]): boolean {
  if (!user) return false;
  return roles.every(role => user.roles.includes(role));
}

/**
 * Filter items based on permission
 */
export function filterByPermission<T extends { permission?: string }>(
  items: T[],
  user: User | null
): T[] {
  if (!user) return [];
  return items.filter(item => {
    if (!item.permission) return true;
    return checkPermission(user, item.permission as PermissionString);
  });
}

