import { Permission } from './permission.enum';

export const PERMISSION_REGISTRY = {
  PATIENT: [
    Permission.PATIENT_READ,
    Permission.PATIENT_CREATE
  ],

  CLINIC: [
    Permission.CLINIC_MANAGE
  ],

  DOCTOR: [
    Permission.DOCTOR_READ,
    Permission.DOCTOR_MANAGE
  ],

  DEPARTMENT: [
    Permission.DEPARTMENT_READ,
    Permission.DEPARTMENT_MANAGE
  ],

  APPOINTMENT: [
    Permission.APPOINTMENT_READ,
    Permission.APPOINTMENT_BOOK
  ],

  EMR: [
    Permission.EMR_READ,
    Permission.EMR_WRITE
  ],

  BILLING: [
    Permission.BILLING_READ,
    Permission.BILLING_WRITE
  ],

  ANALYTICS: [
    Permission.ANALYTICS_READ
  ],

  ADMIN: [
    Permission.ADMIN_READ
  ],

  OPS: [
    Permission.OPS_EXECUTE
  ]
} as const;
