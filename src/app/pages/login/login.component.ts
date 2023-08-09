import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private spotifyService: SpotifyService, private router: Router){}

  ngOnInit(): void {
    this.verificarTokenUrlCallBack();
  }

  public verificarTokenUrlCallBack(){
    const token = this.spotifyService.obterTokenUrlCallBack();
    if(!!token){
      this.spotifyService.definirAccessToken(token);
      this.router.navigate(['/player']);
    }
  }

  openPageLogin = () => {
    window.location.href = this.spotifyService.obterUrlLogin();
  } 
}
