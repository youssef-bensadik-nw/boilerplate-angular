import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/components/app.component';
import { config } from "./app/config/server.config";

import { execSync } from "child_process";
import { i18nConfig } from "./app/config/i18n.config";

export function generateTranslationKeysType(){
	const hygenSrcPath = "src/gen";
	execSync(`cd ${hygenSrcPath} && hygen i18n translations-type --translationPath ${
		i18nConfig.translationPath
	} --defaultLocale ${
		i18nConfig.locales[0].code
	} --localeCodes "${
		i18nConfig.locales.map(l => `'${l.code}'`).join(" | ")
	}"`, { stdio: 'inherit' });
}

generateTranslationKeysType();

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
