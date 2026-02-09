import { Permission } from '../../security';

export interface AdminNavItem {
  label: string;
  route: string;
  permission: Permission;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    label: 'Users',
    route: '/admin/users',
    permission: Permission.ADMIN_READ
  },
  {
    label: 'Clinics',
    route: '/admin/clinics',
    permission: Permission.ADMIN_READ
  },
  {
    label: 'Audit',
    route: '/admin/audit',
    permission: Permission.ADMIN_READ
  }
];
