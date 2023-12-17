import { Account } from "./account.model";
import { Company } from "./company.model";

export interface CompanyAdministrator extends Account {
    id: number;
    firstName: string;
    lastName: string;
    city: string;
    country: string; 
    company: Company;
}