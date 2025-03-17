import "@angular/compiler";

import { i18nConfig } from "../src/common/config/i18n.config";
import {
	LocaleCodeTemplate,
	TranslationKeysTemplate
} from "./templates";

export async function generateTranslationKeysType(){

	const translationFiles = i18nConfig.locales.map(l => `${l.code}.json`);
	const translationFilesImports = translationFiles
		.map((file, index) => `import translationJson${index} from '../public/${i18nConfig.translationPath}/${file}';`)
		.join("\n");
	const translationTypesList = translationFiles
		.map((_, index) => `type TTranslationJson${index} = typeof translationJson${index};`)
		.join("\n");
	const translationTypesUnion = translationFiles
		.map((_, index) => `TTranslationJson${index}`)
		.join(" | ");
	const localeCodes = i18nConfig.locales.map(l => `'${l.code}'`).join(", ");

	const localeCodeContent = LocaleCodeTemplate({
		localeCodes
	});

	const translationKeysContent = TranslationKeysTemplate({
		translationFilesImports,
		translationTypesList,
		translationTypesUnion
	});

	const localeCodePath = "./gen/locale-code.ts";
	const translationKeysPath = "./gen/translation-keys.ts";

	await Bun.write(localeCodePath, localeCodeContent, {
		mode: 1
	});

	await Bun.write(translationKeysPath, translationKeysContent, {
		mode: 1
	});

}
