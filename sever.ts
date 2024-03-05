import express, {Express, Request, Response} from "express";
import { SmartApp } from "@smartthings/smartapp";
import "dotenv/config"

require('dotenv').config();

const app: Express = express();
const port: number = process.env.PORT
const oauth_url: string = process.env.OAUTH_URL

const smartapp = new SmartApp()
    .enableEventLogging(2)
    .page('SpotifyControler', (context, page, configData) => {
        page.section('Please select the controler', section => {
            const ID: string = "spotify-controler";
            section
              .oauthSetting(ID)
              .disabled(true)
              .urlTemplate(oauth_url)
        }); 
    })
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

