import { Equipment } from "./equipment.model";


export interface Company {
    id: number;
    name: string;
    description: string;
    address: string;
    averageRating: number;
    equipments: Equipment[]; 
}