import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/common/components/app.component';
import { config } from "./app/common/config/server.config";

import { execSync } from "child_process";
import { i18nConfig } from "./app/common/config/i18n.config";

export function generateTranslationKeysType(){
	const hygenSrcPath = "src/gen";
	const translationFiles = i18nConfig.locales.map(l => `${l.code}.json`);
	const translationFilesImports = translationFiles
		.map((file, index) => `import translationJson${index} from '../../../public/${i18nConfig.translationPath}/${file}';`)
		.join("\n");
	const translationTypesList = translationFiles
		.map((_, index) => `type TTranslationJson${index} = typeof translationJson${index};`)
		.join("\n");
	const translationTypesUnion = translationFiles
		.map((_, index) => `TTranslationJson${index}`)
		.join(" | ");
	const command = `cd ${hygenSrcPath} && npx hygen i18n translations-type --translationFilesImports "${
		translationFilesImports
	}" --translationTypesList "${
		translationTypesList
	}" --translationTypesUnion "${
		translationTypesUnion
	}" --localeCodes "${
		i18nConfig.locales.map(l => `'${l.code}'`).join(" | ")
	}"`;

	execSync(command, { stdio: 'inherit' });
}

generateTranslationKeysType();

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
