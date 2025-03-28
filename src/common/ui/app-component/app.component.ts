import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LocalSelectorComponent } from "~features/i18n/ui/locale-selector/locale-selector.component";

@Component({
    selector: 'nw-root',
    imports: [RouterOutlet, MatIconModule, MatButtonModule, LocalSelectorComponent],
    template: `
		<nw-local-selector class="fixed bottom-3 end-3" />
		<router-outlet />
	`,
})
export class AppComponent {}
