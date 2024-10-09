import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/components/app.component';
import { config } from "./app/config/server.config";

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
