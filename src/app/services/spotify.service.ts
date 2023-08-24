import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import  Spotify from 'spotify-web-api-js';
import { IUsuario } from '../interfaces/iUsuario';
import { SpotifyArtistaParaArtista, SpotifyPlaylistParaPlaylist, SpotifyTrackParaMusica, SpotifyUserParaUsuario } from '../Common/spotifyHelper';
import { iPlaylist } from '../interfaces/iPlaylist';
import { Router } from '@angular/router';
import { iArtista } from '../interfaces/iArtista';
import { iMusica } from '../interfaces/iMusica';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
   }

   

  public obterUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  public obterTokenUrlCallBack(){
    if(!window.location.hash){
      return '';
    }
    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  public definirAccessToken(token: string){
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
    this.spotifyApi
  }

  async obterSpotifyUsuario(){
    const userInfo = this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(await userInfo);
  }

  async inicializarUsuario() {
    if(!!this.usuario)
      return true;

    const token = localStorage.getItem('token');

    if(!token)
      return false;

    try {

      this.definirAccessToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;

    }catch(ex){
      return false;
    }
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<iPlaylist[]>{
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, {offset, limit});
    return playlists.items.map(SpotifyPlaylistParaPlaylist)
    
  }

  async buscarTopArtistas(limit = 10): Promise<iArtista[]>{
    const artistas = await this.spotifyApi.getMyTopArtists({limit});
    return artistas.items.map(SpotifyArtistaParaArtista)
  }

  async buscarMusicas(offset = 0, limit = 50): Promise<iMusica[]>{
    const musicas = await this.spotifyApi.getMySavedTracks({offset, limit});
    return musicas.items.map(x => SpotifyTrackParaMusica(x.track));
  }

  async executarMusica(musicaId: string){
    await this.spotifyApi.queue(musicaId);
    await this.spotifyApi.skipToNext();
  }

  logout(){
    this.router.navigate(['/login']);
  }
}
