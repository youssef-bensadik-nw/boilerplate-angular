import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { NGXLogger } from "ngx-logger";
import { TranslationService } from '../services';

@Component({
	selector: 'nw-root',
	standalone: true,
	imports: [RouterOutlet, TranslateModule],
	template: `
		@if (translationService.translationKeys(); as tr) {
			<h1 class="text-3xl font-bold underline">
				{{ tr.i18n.currentLanguage({ lang: currentLocale().localeSpecificName ?? currentLocale().code }) }}
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
	private readonly logger = inject(NGXLogger);
	protected readonly translationService = inject(TranslationService);
	protected readonly currentLocale = this.translationService.currentLocale;
}
