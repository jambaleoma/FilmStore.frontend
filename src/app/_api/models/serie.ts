import { Stagione } from './stagione';

export interface Serie {
    serie_id?: string;
    nome?: string;
    stagioni?: Stagione[];
}
