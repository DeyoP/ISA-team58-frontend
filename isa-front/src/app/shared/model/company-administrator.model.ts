import { Company } from "./company.model";

export interface CompanyAdministrator {
    id: number;
    firstName: string;
    lastName: string;
    city: string;
    country: string; 
    company: Company;
}