import "@angular/compiler";
import { execSync } from "child_process";
import { i18nConfig } from "../app/common/config/i18n.config";

export function generateTranslationKeysType(){
	const hygenSrcPath = "src/gen",
	 translationFiles = i18nConfig.locales.map(l => `${l.code}.json`),
	 translationFilesImports = translationFiles
		.map((file, index) => `import translationJson${index} from '../../../public/${i18nConfig.translationPath}/${file}';`)
		.join("\n"),
	 translationTypesList = translationFiles
		.map((_, index) => `type TTranslationJson${index} = typeof translationJson${index};`)
		.join("\n"),
	 translationTypesUnion = translationFiles
		.map((_, index) => `TTranslationJson${index}`)
		.join(" | "),
	 command = `cd ${hygenSrcPath} && npx hygen i18n translations-type --translationFilesImports "${
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
