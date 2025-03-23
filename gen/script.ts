import "@angular/compiler";

import {
	LocaleCodeTemplate,
	TranslationKeysTemplate
} from "./templates";
import { watch } from "fs";
import { debounceTime, Subject, tap } from "rxjs";
import { I18nConfigUseCase } from "~features/i18n/domain/usecases/i18n-config/i18n-config.usecase";

const i18nConfig = new I18nConfigUseCase().handle();

async function _generateTranslationKeysType(){

	const translationFiles = i18nConfig.locales.map(l => `${l.code}.json`);
	const translationFilesImports = translationFiles
		.map((file, index) => `import translationJson${index} from '~public/${i18nConfig.translationPath}/${file}';`)
		.join("\n");
	const translationTypesList = translationFiles
		.map((_, index) => `type TTranslationJson${index} = typeof translationJson${index};`)
		.join("\n");
	const translationTypesUnion = translationFiles
		.map((_, index) => `TTranslationJson${index}`)
		.join(" | ");
	const localeCodes = i18nConfig.locales
		.map(l => `'${l.code}'`)
		.join(" | ");

	await Bun.write("./src/features/i18n/domain/types/LocaleCode.ts", LocaleCodeTemplate({
		localeCodes
	}), { mode: 1 });

	await Bun.write("./src/features/i18n/domain/types/TranslationKeys.ts", TranslationKeysTemplate({
		translationFilesImports,
		translationTypesList,
		translationTypesUnion
	}), { mode: 1 });

}

export function generateTranslationKeysType(watchList: string[]) {
	const subject = new Subject<string | null>();

	setTimeout(() => {
		subject.next(null);
	}, 0);

	const watchers = watchList.map(path => watch(path, { recursive: true }, (_, filename) => {
		if (!filename) return;
		subject.next(filename);
	}));

	process.on("SIGINT", () => {
		subject.complete();
		watchers.forEach(watcher => watcher.close());
		process.exit(0);
	});

	return subject
		.pipe(debounceTime(1000))
		.pipe(tap(() => {
			_generateTranslationKeysType();
		}));
}

export const generateTranslationKeysTypeNoWatch = _generateTranslationKeysType;
