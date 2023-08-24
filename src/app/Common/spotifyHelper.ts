import { addMilliseconds, format } from "date-fns"
import { iArtista } from "../interfaces/iArtista"
import { iMusica } from "../interfaces/iMusica"
import { iPlaylist } from "../interfaces/iPlaylist"
import { IUsuario } from "../interfaces/iUsuario"

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario{
    return {
        id: user.id,
        nome: user.display_name,
        imgUrl: user.images.pop().url
    }
}

export function SpotifyPlaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): iPlaylist{
    return {
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: playlist.images.pop().url
    }
}

export function SpotifyArtistaParaArtista(spotifyArtista: SpotifyApi.ArtistObjectFull): iArtista {
    return {
        id: spotifyArtista.id,
        imgUrl: spotifyArtista.images.sort((a,b) => a.width - b.width).pop().url,
        nome: spotifyArtista.name
    }
}

export function SpotifyTrackParaMusica(spotifyTrack: SpotifyApi.TrackObjectFull): iMusica { 

    const msParaMinutos = (ms: number) => {
        const data = addMilliseconds(new Date(0), ms);
        return format(data, 'dd:ms')
    }
    return {
        id: spotifyTrack.uri,
        titulo: spotifyTrack.name,
        album: {
            id: spotifyTrack.id,
            nome: spotifyTrack.album.name,
            imgUrl: spotifyTrack.album.images.shift().url
        },
        artistas: spotifyTrack.artists.map(artista => ({
            id: artista.id,
            nome: artista.name
        })),
        tempo: msParaMinutos(spotifyTrack.duration_ms)
    }
}