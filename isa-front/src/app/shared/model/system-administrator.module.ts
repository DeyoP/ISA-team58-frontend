import { Account } from "./account.model";

export interface SystemAdministrator extends Account{
    firstLogin: boolean;
}