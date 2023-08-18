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