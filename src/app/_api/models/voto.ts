export interface Voto {
    id?: string;
    voto_id?: string;
    idFilm?: string;
    nomeFilm?: string;
    idCustomer?: string;
    firstNameCustomer?: string;
    lastNameCustomer?: string;
    dataCreazioneVoto?: string;
    votazione?: number;
    like?: boolean;
    dislike?: boolean;
}
