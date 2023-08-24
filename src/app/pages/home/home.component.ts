import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { newMusica } from 'src/app/Common/factories';
import { iMusica } from 'src/app/interfaces/iMusica';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{


  musicas: iMusica[] = [];
  musicaAtual: iMusica = newMusica();

  subs: Subscription[] = [];

  //icone play musica
  playIcone = faPlay;

  constructor(private spotifyService: SpotifyService, private playerService: PlayerService){}

  ngOnInit(): void {
      this.obterMusicas();
      this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
      this.subs.forEach(sub => sub.unsubscribe());
  }

  async obterMusicas(){
    this.musicas = await this.spotifyService.buscarMusicas();
  }

  obterMusicaAtual(){
   const sub =  this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    })

    this.subs.push(sub);
  }

  obterArtistas(musica: iMusica){
    return musica.artistas.map(artista => artista.nome).join(', ')
  }

 async executarMusica(musica: iMusica){
  await this.spotifyService.executarMusica(musica.id);
  this.playerService.definirMusicaAtual(musica);
  }


}
