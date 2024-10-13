import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { NGXLogger } from "ngx-logger";

@Component({
	selector: 'nw-root',
	standalone: true,
	imports: [RouterOutlet, TranslateModule],
	template: `
		<h1 class="text-3xl font-bold underline">
			Hello world! using {{ "test" | translate }}
		</h1>
		<router-outlet />
	`,
	styles: [],
})
export class AppComponent {

	constructor(private logger: NGXLogger) {}
}
