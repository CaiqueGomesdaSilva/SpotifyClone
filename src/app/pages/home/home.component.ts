import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { iMusica } from 'src/app/interfaces/iMusica';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


  musicas: iMusica[] = [];

  //icone play musica
  playIcone = faPlay;

  constructor(private spotifyService: SpotifyService){}

  ngOnInit(): void {
      this.obterMusicas();
  }

  async obterMusicas(){
    this.musicas = await this.spotifyService.buscarMusicas();
  }

  obterArtistas(musica: iMusica){
    return musica.artistas.map(artista => artista.nome).join(', ')
  }

 async executarMusica(musica: iMusica){
  await this.spotifyService.executarMusica(musica.id);
  }
}
