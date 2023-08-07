import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private spotifyService: SpotifyService){}

  ngOnInit(): void {
    this.verificarTokenUrlCallBack();
  }

  public verificarTokenUrlCallBack(){
    const token = this.spotifyService.obterTokenUrlCallBack();
    if(token){
      this.spotifyService.definirAccessToken(token);
    }
  }

  openPageLogin = () => {
    window.location.href = this.spotifyService.obterUrlLogin();
  } 
}
