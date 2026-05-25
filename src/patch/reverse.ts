import {
  ParsedPatchFile,
  PatchFilePart,
  Hunk,
  HunkHeader,
  verifyHunkIntegrity,
} from "./parse"
import { assertNever } from "../assertNever"

function reverseHunk(hunk: Hunk): Hunk {
    throw new Error("STUB");
}

function reversePatchPart(part: PatchFilePart): PatchFilePart {
    throw new Error("STUB");
}

export const reversePatch = (patch: ParsedPatchFile): ParsedPatchFile => {
  return patch.map(reversePatchPart).reverse()
}
