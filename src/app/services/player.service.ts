import { Injectable } from '@angular/core';
import { iMusica } from '../interfaces/iMusica';
import { BehaviorSubject} from 'rxjs';
import { newMusica } from '../Common/factories';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  musicaAtual = new BehaviorSubject<iMusica>(newMusica());

  constructor(private spotifyService: SpotifyService) { 
    this.obterMusicaAtual();
  }

  async obterMusicaAtual(){
    const musica = await this.spotifyService.obterMusicaAtual();
    this.definirMusicaAtual(musica);
  }

  definirMusicaAtual(musica: iMusica){
    this.musicaAtual.next(musica);
  }
}
