import { bootstrapApplication } from "@angular/platform-browser";
import { serverConfig } from "./common/config/app.config";
import { AppComponent } from "./common/ui/app-component";

export default () => bootstrapApplication(AppComponent, serverConfig);
