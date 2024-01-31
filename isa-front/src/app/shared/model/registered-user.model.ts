import { Account } from "./account.model";

export interface RegisteredUser extends Account{
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    phoneNumber: string;
    job: string;
    workplaceId: number;
    penaltyPoints: number;
}

