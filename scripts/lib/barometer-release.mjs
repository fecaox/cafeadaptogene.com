import { createHash } from "node:crypto";

export function sourceDigest(sourceText) {
  return createHash("sha256").update(sourceText, "utf8").digest("hex");
}

export function assertEditionSource(sourceText, manifest) {
  const actual = sourceDigest(sourceText);
  if (actual !== manifest.sourceDataSha256) {
    throw new Error(
      `L’édition 2027 (${manifest.datasetVersion}) est figée mais sa source a changé. `
      + "Publiez une correction versionnée et mettez à jour explicitement son empreinte.",
    );
  }
  return actual;
}
