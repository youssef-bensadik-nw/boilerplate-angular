import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { NGXLogger } from "ngx-logger";
import { TranslationService } from "../../lib/i18n/translation.service";
import { AsyncPipe } from "@angular/common";

@Component({
	selector: 'nw-root',
	standalone: true,
	imports: [RouterOutlet, TranslateModule, AsyncPipe],
	template: `
		@if (translationService.tx$ | async; as translate) {
			<h1 class="text-3xl font-bold underline">
				{{ translate.i18n.currentLanguage(
					translationService.currentLocale().localeSpecificName ??
					translationService.currentLocale().code)
				}}
			</h1>
			@for (locale of translationService.availableLocales(); track locale) {
				<button class="ml-2 bg-amber-100 p-2 rounded-xl" (click)="translationService.useLocale(locale.code)">
					{{ locale.localeSpecificName }}
				</button>
			}
			<router-outlet/>
		}
	`,
	styles: [],
})
export class AppComponent {
	constructor(
		protected readonly translationService: TranslationService,
		private logger: NGXLogger) {
	}
}
