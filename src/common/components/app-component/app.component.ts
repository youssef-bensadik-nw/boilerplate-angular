import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
    selector: 'nw-root',
    imports: [RouterOutlet, MatSlideToggleModule, TranslateModule],
    template: `
		<mat-slide-toggle>Toggle me!</mat-slide-toggle>
		<router-outlet />
	`,
    styles: []
})
export class AppComponent {}
