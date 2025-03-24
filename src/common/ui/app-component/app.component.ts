import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LocalSelectorComponent } from "~features/i18n/ui/locale-selector/locale-selector.component";
import { TranslationKeysUseCase } from '~features/i18n/domain/usecases/translation-keys/translation-keys.usecase';
import { CurrentLocaleUseCase } from '~features/i18n/domain/usecases/current-locale/current-locale.usecase';
import { usecase } from '~common/ui/utils/usecase';



@Component({
    selector: 'nw-root',
    imports: [RouterOutlet, MatIconModule, MatButtonModule, LocalSelectorComponent],
    template: `
		@if (txKeys(); as txKeys) {
			@if (currentLocale(); as currentLocale) {
				<span>{{ txKeys.i18n.currentLanguage({ lang: currentLocale.localeSpecificName ?? "" }) }}</span>
			}
		}
		<nw-local-selector class="fixed bottom-3 end-3" />
		<router-outlet />
	`,
})
export class AppComponent {
	readonly txKeys = usecase(TranslationKeysUseCase);
	readonly currentLocale = usecase(CurrentLocaleUseCase);
}
