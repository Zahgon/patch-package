import { join } from "./path"
import { removeSync } from "fs-extra"
import klawSync from "klaw-sync"

export function removeIgnoredFiles(
  dir: string,
  includePaths: RegExp,
  excludePaths: RegExp,
) {
  klawSync(dir, { nodir: true })
    .map((item) => { throw new Error("STUB"); })
    .filter(
      (relativePath) =>
        { throw new Error("STUB"); },
    )
    .forEach((relativePath) => { throw new Error("STUB"); })
}
