import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../components';
import { config } from '../config/server.config';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
