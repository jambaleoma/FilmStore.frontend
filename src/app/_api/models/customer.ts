import { Richiesta } from './richiesta';

export interface Customer {
    id?: string;
    label?: string;
    value: any;
    styleClass?: string;
    icon?: string;
    title?: string;
    password?: string;
    numeroRichieste?: number;
    firstName?: string;
    lastName?: string;
    sesso?: string;
    dataDiNascita?: string;
    richieste?: Richiesta[];
    categoriePreferite?: string[];
    admin?: boolean;
    avatar?: boolean;
    avatarBase64?: string;
}
