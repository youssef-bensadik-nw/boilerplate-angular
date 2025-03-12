import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: 'nw-root',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, TranslateModule],
    template: `
		<router-outlet />
	`,
    styles: []
})
export class AppComponent {}
