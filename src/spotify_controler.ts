import axios, { AxiosRequestConfig } from "axios";

//utils
function makeRequest(url: string, headers: string, method: string){
  let config: AxiosRequestConfig = {
    method: method,
    url: url,
  }
  try{
    const { data, status } = await axios.request(config);
    return { data, status };
  }catch{
    console.log("Somthing was wrong on the reequest to spotify API");
  };
};

class Player{
  pausePlayback: string;
  skipToPlayback: string;
  skipToPrevious: string;


  constructor(){
    this.pausePlayback = "https://api.spotify.com/v1/me/player/pause"
    this.skipToPlayback = "https://api.spotify.com/v1/me/player/next"
    this.skipToPrevious = "https://api.spotify.com/v1/me/player/previous"
  }
 
  pauseSong(): void{
    makeRequest(this.pausePlayback, "", "put" );
  };
  skipNextSong(): void{
    makeRequest(this.skipToPlayback, "", "post" );
  };
  skipPreviosSong(): void{
    makeRequest(this.skipToPrevious, "", "put" );
  };
};

export class SpotifyApi extends Player{
  token: string;

  constructor(token: string ){
    super()
    this.token = token;
  }
};

