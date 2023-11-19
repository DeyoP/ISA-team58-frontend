import { Equipment } from "./equipment.model";


export interface Company {
    id: number;
    name: string;
    description: string;
    address: string;
    rating: number;
    equipments: Equipment[]; 
    certification: string;
    phoneNumber: string;
}