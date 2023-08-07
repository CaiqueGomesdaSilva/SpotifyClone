import { IUsuario } from "../interfaces/iusuario"

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario{
    return {
        id: user.id,
        nome: user.display_name,
        imgUrl: user.images.pop().url
    }
}