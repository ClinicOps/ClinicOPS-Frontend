export interface Clinic {
  id: string;
  name: string;
  workspaceId: string;
  status: 'ACTIVE' | 'INACTIVE';
}
