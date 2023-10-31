import { existsSync } from "fs";
import { dirname, resolve } from "path";

export function getImportSource({
  source,
  fileName,
}: {
  source: string;
  fileName: string;
}): string | null {
  const importedModulePath = resolve(dirname(fileName), source);

  if (existsSync(importedModulePath)) {
    return importedModulePath;
  }

  if (existsSync(importedModulePath + ".js")) {
    return importedModulePath + ".js";
  }

  if (existsSync(importedModulePath + ".ts")) {
    return importedModulePath + ".ts";
  }

  return null;
}
