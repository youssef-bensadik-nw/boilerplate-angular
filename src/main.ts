import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './common/components';
import { clientConfig } from './common/config/client.config';

bootstrapApplication(AppComponent, clientConfig)
	.catch((err) => console.error(err));
