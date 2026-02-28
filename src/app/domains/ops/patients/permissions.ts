import { PermissionString } from "../../../core/permissions/permission.types";

// Permission constants for Patients domain
export const PATIENTS_PERMISSIONS = {
  VIEW: 'OPS:PATIENT:VIEW'  as PermissionString,
  CREATE: 'OPS:PATIENT:CREATE' as PermissionString,
  UPDATE: 'OPS:PATIENT:UPDATE' as PermissionString,
  DELETE: 'OPS:PATIENT:DELETE' as PermissionString,
};
