import { bootstrapApplication } from '@angular/platform-browser';
import { clientConfig } from './app/config/client.config';
import { AppComponent } from './app/components/app.component';

bootstrapApplication(AppComponent, clientConfig)
	.catch((err) => console.error(err));
