export interface User {
  id: string;
  email: string;
  roles: string[];
  workspaceId: string;
  status: 'ACTIVE' | 'INACTIVE';
}
