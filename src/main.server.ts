import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/common/components/app.component';
import { config } from "./app/common/config/server.config";

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
