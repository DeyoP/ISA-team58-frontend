import { Time } from "@angular/common";
import { Equipment } from "./equipment.model";
import { Company } from "./company.model";
import { CompanyAdministrator } from "./company-administrator.model";

export interface AvailableTimeSlots {
    id: number;
    date: Date;
    time: string;
    duration: number;
    companyAdministratorId: number;
    companyId: number;
    equipmentId: number;
    registeredUser: number;
}