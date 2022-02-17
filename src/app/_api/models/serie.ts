import { Stagione } from './stagione';

export interface Serie {
    serie_id?: string;
    _id?: string;
    nome?: string;
    locandina?: string;
    stagioni?: Stagione[];
    dataCreazione?: string;
}
