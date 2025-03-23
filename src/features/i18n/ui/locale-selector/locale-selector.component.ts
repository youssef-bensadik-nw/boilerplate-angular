import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { CurrentLocaleUseCase } from "~features/i18n/domain/usecases/current-locale/current-locale.usecase";
import { I18nConfigUseCase } from "~features/i18n/domain/usecases/i18n-config/i18n-config.usecase";
import { SetLocaleUseCase } from "~features/i18n/domain/usecases/set-locale/set-locale.usecase";

@Component({
	selector: "nw-local-selector",
	imports: [MatButtonModule, MatIconModule, AsyncPipe, MatMenuModule],
	template: `
		<button mat-fab
			[matMenuTriggerFor]="languagesMenu"
			aria-label="">
				<mat-icon>language</mat-icon>
        </button>

		<mat-menu #languagesMenu="matMenu">
			@if (currentLocale$ | async; as current) {
				@for (locale of i18nConfig.locales; track $index) {
					<button mat-menu-item
						[disabled]="current.code === locale.code"
						(click)="setLocaleUseCase.handle(locale)">
							{{ locale.localeSpecificName }}
					</button>
				}
			}
		</mat-menu>
	`,
})
export class LocalSelectorComponent {
	setLocaleUseCase = inject(SetLocaleUseCase);
	i18nConfig = inject(I18nConfigUseCase).handle();
	currentLocale$ = inject(CurrentLocaleUseCase).handle();
}
