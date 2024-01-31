export interface EquipmentAppointment {
    id: number;
    equipmentId: number;
    userId: number;
    availableTimeSlotId: number;
    extraordinary: boolean;
    companyId: number;
    status: appointmentStatus;
  }

export enum appointmentStatus{
  RESERVED, 
  TAKEN, 
  RETURNED, 
  CANCELLED,
  REJECTED
}
  