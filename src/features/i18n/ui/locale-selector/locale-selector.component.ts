import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { usecase } from "~common/ui/utils/usecase";
import { CurrentLocaleUseCase } from "~features/i18n/domain/usecases/current-locale/current-locale.usecase";
import { I18nConfigUseCase } from "~features/i18n/domain/usecases/i18n-config/i18n-config.usecase";
import { SetLocaleUseCase } from "~features/i18n/domain/usecases/set-locale/set-locale.usecase";

@Component({
	selector: "nw-local-selector",
	imports: [MatButtonModule, MatIconModule, MatMenuModule],
	template: `
		<button mat-fab
			[matMenuTriggerFor]="languagesMenu"
			aria-label="">
				<mat-icon>language</mat-icon>
        </button>

		<mat-menu #languagesMenu="matMenu">
			@if (currentLocale(); as current) {
				@for (locale of i18nConfig().locales; track $index) {
					<button mat-menu-item
						[disabled]="current.code === locale.code"
						(click)="setLocale(locale)">
							{{ locale.localeSpecificName }}
					</button>
				}
			}
		</mat-menu>
	`,
})
export class LocalSelectorComponent {
	readonly setLocale = usecase(SetLocaleUseCase);
	readonly i18nConfig = usecase(I18nConfigUseCase);
	readonly currentLocale = usecase(CurrentLocaleUseCase);
}
