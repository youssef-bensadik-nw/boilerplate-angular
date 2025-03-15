import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslationService } from 'src/common/i18n';

@Component({
    selector: 'nw-root',
    imports: [RouterOutlet, MatIconModule, MatButtonModule],
    template: `
		@if (translationService.translationKeys(); as tr) {
			<button mat-fab extended aria-label="Example icon button with a delete icon">
				<mat-icon>delete</mat-icon>
				<span>{{ tr.actions.delete }}</span>
			</button>
		}
		<router-outlet />
	`,
    styles: []
})
export class AppComponent {
	translationService = inject(TranslationService);
}
