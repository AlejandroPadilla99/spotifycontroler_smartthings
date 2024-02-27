import express, {Express, request, Request, Response} from "express";
import axios, {AxiosRequestConfig} from 'axios'
import { SmartApp } from "@smartthings/smartapp";

const app: Express = express();
const port: number = 3000

///delete this after to try 
let data: any = '';

let config: AxiosRequestConfig = {
  method: 'put',
  maxBodyLength: Infinity,
  url: 'https://api.spotify.com/v1/me/player/pause',
  headers: {
    'Authorization': 'Bearer '
  },
  data: data
};

function makeRequest() {
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    }); 
}
//
const smartapp = new SmartApp()
    .enableEventLogging(2) // logs all lifecycle event requests and responses as pretty-printed JSON. Omit in production
    .page('SpotifyControler', (context, page, configData) => {
        page.section('Please select the controler', section => {
            section
                .deviceSetting('speaker')
                .capabilities(['mediaPlayback'])
        }); 
    })
    // Called for both INSTALLED and UPDATED lifecycle events if there is no separate installed() handler
    .updated(async (context, updateData) => {
        await context.api.subscriptions.delete()
        await context.api.subscriptions.subscribeToDevices(context.config.speaker, 'Speaker', 'Speaker', 'SpotifyControler');
    })
    .subscribedEventHandler('SpotifyControler', async (context, event) => {
      console.log(event)
    });

app.use(express.json());

app.post("/", (req: Request, res: Response) => {
    smartapp.handleHttpCallback(req, res);
});
  
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

