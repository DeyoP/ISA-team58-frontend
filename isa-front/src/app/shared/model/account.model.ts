export interface Account {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    city: string;
    country: string;
    phoneNumber: string;
    job: string;
    workplaceId: number;
    isActive:boolean;
    isDeleted: boolean;
}