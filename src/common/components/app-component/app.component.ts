import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslationService } from '../../i18n';

@Component({
    selector: 'nw-root',
    imports: [RouterOutlet, MatIconModule, MatButtonModule],
    template: `
		@if (translationService.translationKeys(); as tr) {
			<button mat-fab extended class="m-5">
				<mat-icon>delete</mat-icon>
				{{ tr.actions.delete }}
			</button>
		}
		<router-outlet />
	`,
    styles: []
})
export class AppComponent {
	translationService = inject(TranslationService);
}
