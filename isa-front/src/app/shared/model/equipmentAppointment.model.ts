export interface EquipmentAppointment {
    id: number;
    equipmentId: number;
    userId: number;
    startTime: Date;
    endTime: Date;
    isExtraordinary: boolean;
  }
  