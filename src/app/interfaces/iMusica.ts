export interface iMusica{
    id: string,
    titulo: string,
    artistas: {
        id: string,
        nome: string
    }[],
    album: {
        id: string,
        nome: string,
        imgUrl: string
    },
    tempo: string
}