export interface Account {
    id: number;
    email: string;
    password: string;
    isActive: boolean;
    isDeleted: boolean;
    dtype: String;
}