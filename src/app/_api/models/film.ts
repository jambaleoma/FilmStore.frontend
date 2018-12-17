export interface Film {
    _id?: string;
    nome?: string;
    formato?: string;
    categoria?: string[];
    linguaAudio?: string[];
    linguaSottotitoli?: string[];
    anno?: number;
    trama?: string;
    urlLocandina?: string;
}
