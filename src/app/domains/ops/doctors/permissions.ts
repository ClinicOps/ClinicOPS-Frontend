import { PermissionString } from "../../../core/permissions/permission.types";

export const DOCTOR_PERMISSIONS = {
  VIEW: 'OPS_DOCTOR_VIEW'  as PermissionString,
  CREATE: 'OPS_DOCTOR_CREATE' as PermissionString,
  UPDATE: 'OPS_DOCTOR_UPDATE' as PermissionString,
  ARCHIVE: 'OPS_DOCTOR_ARCHIVE' as PermissionString,
  STATUS_CHANGE: 'OPS_DOCTOR_STATUS_CHANGE' as PermissionString
};
