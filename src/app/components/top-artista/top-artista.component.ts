import { Component, OnInit } from '@angular/core';
import { newArtista } from 'src/app/Common/factories';
import { iArtista } from 'src/app/interfaces/iArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artista',
  templateUrl: './top-artista.component.html',
  styleUrls: ['./top-artista.component.scss']
})
export class TopArtistaComponent implements OnInit{

  topArtista: iArtista = newArtista();

  constructor(private spotifyService: SpotifyService){}

  ngOnInit(): void {
      this.buscarArtista();
  }

 async buscarArtista(){
    const artistas = await this.spotifyService.buscarTopArtistas(1);

    if(!!artistas){
      this.topArtista = artistas.pop();
    }
  }
}