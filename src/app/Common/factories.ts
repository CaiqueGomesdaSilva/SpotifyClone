import { iArtista } from "../interfaces/iArtista";
import { iMusica } from "../interfaces/iMusica";

export function newArtista(): iArtista {
    return {
        id: '',
        imgUrl: '',
        nome: '',
    }
}

export function newMusica(): iMusica {
    return {
        id: '',
        titulo: '',
        artistas: [],
        album: {
            id: '',
            nome: '',
            imgUrl: ''
        },
        tempo: ''
    }
}