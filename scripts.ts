import { generateTranslationKeysType, generateTranslationKeysTypeNoWatch } from "gen/script";

const watch = Bun.argv.includes("--watch");

function onTranslationKeysTypeGenerated() {
	console.info("\x1b[32m\n🔄Translation keys type generated successfully!\x1b[0m\n");
}

if (watch) {
	generateTranslationKeysType([
		"./public/translations",
		"./src/features/i18n/domain/i18n.config.ts"
	]).subscribe(onTranslationKeysTypeGenerated);
} else {
	generateTranslationKeysTypeNoWatch()
		.then(onTranslationKeysTypeGenerated);
}

