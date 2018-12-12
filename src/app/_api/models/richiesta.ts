export interface Richiesta {
    id: string;
    titoloFilmRichiesto?: string;
    formatoFilmRichiesto?: string;
    dataInserimento?: string;
    nomeCliente?: string;
    stato?: string;
    avanzamento?: number;
    note?: string;
}
