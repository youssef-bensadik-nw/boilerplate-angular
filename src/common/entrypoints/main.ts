import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../components';
import { clientConfig } from '../config/client.config';

bootstrapApplication(AppComponent, clientConfig)
	.catch((err) => console.error(err));
