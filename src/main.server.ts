import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './common/components';
import { config } from './common/config/server.config';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
