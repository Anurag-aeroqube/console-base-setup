// RBAC Type Definitions
export type Permission = string;
export type Role = string;

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar_url?: string;
  roles: Role[];
  permissions: Permission[];
}

export interface RoleDefinition {
  name: Role;
  permissions: Permission[];
  description?: string;
}

export interface PermissionDefinition {
  resource: string;
  action: string;
  description?: string;
}

export type PermissionString = `${string}:${string}`; // Format: "resource:action"

export interface RBACConfig {
  roles: RoleDefinition[];
  permissions: PermissionDefinition[];
}

export interface AccessControl {
  canAccess: (permission: PermissionString) => boolean;
  hasRole: (role: Role) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;
  hasAllRoles: (roles: Role[]) => boolean;
}

