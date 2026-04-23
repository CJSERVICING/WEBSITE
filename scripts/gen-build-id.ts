import { writeFileSync } from "fs";

// Generates a short, unique build identifier embedded into session tokens.
// Runs as a prebuild step so every deployment produces a different constant,
// causing all sessions issued by a previous deployment to be rejected.
const id = Date.now().toString(36);
writeFileSync(
  "./functions/_lib/buildId.ts",
  `// Auto-generated — do not edit. Regenerated on every build.\nexport const BUILD_ID = "${id}";\n`,
);
