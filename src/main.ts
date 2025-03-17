import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './common/ui/app-component';
import { clientConfig } from './common/config/app.config';

bootstrapApplication(AppComponent, clientConfig)
	.catch((err) => console.error(err));
