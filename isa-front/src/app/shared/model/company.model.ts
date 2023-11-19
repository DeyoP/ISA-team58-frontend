import { Equipment } from "./equipment.model";


export interface Company {
    id: number;
    administratorId: number;
    name: string;
    description: string;
    address: string;
    city: string;
    certification: string;
    rating: number;
    phoneNumber: string;
    equipments: Equipment[]; 
}