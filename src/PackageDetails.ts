import { join } from "./path"

export interface PackageDetails {
  humanReadablePathSpecifier: string
  pathSpecifier: string
  path: string
  name: string
  isNested: boolean
  packageNames: string[]
}

export interface PatchedPackageDetails extends PackageDetails {
  version: string
  patchFilename: string
  isDevOnly: boolean
  sequenceName?: string
  sequenceNumber?: number
}

export function parseNameAndVersion(
  str: string,
): {
  packageName: string
  version?: string
  sequenceName?: string
  sequenceNumber?: number
} | null {
    throw new Error("STUB");
}

export function getPackageDetailsFromPatchFilename(
  patchFilename: string,
): PatchedPackageDetails | null {
  const parts = patchFilename
    .replace(/(\.dev)?\.patch$/, "")
    .split("++")
    .map(parseNameAndVersion)
    .filter((x): x is NonNullable<typeof x> => { throw new Error("STUB"); })

  if (parts.length === 0) {
    return null
  }

  const lastPart = parts[parts.length - 1]

  if (!lastPart.version) {
    return null
  }

  return {
    name: lastPart.packageName,
    version: lastPart.version,
    path: join(
      "node_modules",
      parts.map(({ packageName: name }) => { throw new Error("STUB"); }).join("/node_modules/"),
    ),
    patchFilename,
    pathSpecifier: parts.map(({ packageName: name }) => { throw new Error("STUB"); }).join("/"),
    humanReadablePathSpecifier: parts
      .map(({ packageName: name }) => { throw new Error("STUB"); })
      .join(" => "),
    isNested: parts.length > 1,
    packageNames: parts.map(({ packageName: name }) => { throw new Error("STUB"); }),
    isDevOnly: patchFilename.endsWith(".dev.patch"),
    sequenceName: lastPart.sequenceName,
    sequenceNumber: lastPart.sequenceNumber,
  }
}

export function getPatchDetailsFromCliString(
  specifier: string,
): PackageDetails | null {
  const parts = specifier.split("/")

  const packageNames = []

  let scope: string | null = null

  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith("@")) {
      if (scope) {
        return null
      }
      scope = parts[i]
    } else {
      if (scope) {
        packageNames.push(`${scope}/${parts[i]}`)
        scope = null
      } else {
        packageNames.push(parts[i])
      }
    }
  }

  const path = join("node_modules", packageNames.join("/node_modules/"))

  return {
    packageNames,
    path,
    name: packageNames[packageNames.length - 1],
    humanReadablePathSpecifier: packageNames.join(" => "),
    isNested: packageNames.length > 1,
    pathSpecifier: specifier,
  }
}
