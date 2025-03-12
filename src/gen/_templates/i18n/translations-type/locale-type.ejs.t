---
to: generated/locale-type.g.ts
force: true
---
<%- translationFilesImports %>

<%= translationTypesList %>

export type TranslationKeys = <%= translationTypesUnion %>;
