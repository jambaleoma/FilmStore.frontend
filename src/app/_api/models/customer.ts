import { Richiesta } from './richiesta';

export interface Customer {
    id?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    richieste?: Richiesta[];
}
