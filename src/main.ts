import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/common/components/app.component';
import { clientConfig } from './app/common/config/client.config';

bootstrapApplication(AppComponent, clientConfig)
	.catch((err) => console.error(err));
