import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { User, Role, PermissionString, AccessControl } from '@/types/rbac';
import { checkPermission, checkRole } from '@/lib/rbac';

interface RBACContextValue extends AccessControl {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const RBACContext = createContext<RBACContextValue | null>(null);

interface RBACProviderProps {
  children: ReactNode;
  user: User | null;
  isLoading?: boolean;
}

export function RBACProvider({ children, user, isLoading = false }: RBACProviderProps) {
  const isAuthenticated = !!user;

  const accessControl: AccessControl = useMemo(() => {
    if (!user) {
      return {
        canAccess: () => false,
        hasRole: () => false,
        hasAnyRole: () => false,
        hasAllRoles: () => false,
      };
    }

    return {
      canAccess: (permission: PermissionString) => checkPermission(user, permission),
      hasRole: (role: Role) => checkRole(user, role),
      hasAnyRole: (roles: Role[]) => roles.some(role => checkRole(user, role)),
      hasAllRoles: (roles: Role[]) => roles.every(role => checkRole(user, role)),
    };
  }, [user]);

  const value: RBACContextValue = useMemo(
    () => ({
      ...accessControl,
      user,
      isLoading,
      isAuthenticated,
    }),
    [accessControl, user, isLoading, isAuthenticated]
  );

  return <RBACContext.Provider value={value}>{children}</RBACContext.Provider>;
}

export function useRBAC() {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within RBACProvider');
  }
  return context;
}

