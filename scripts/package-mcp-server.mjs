import { access, cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const source = path.join(root, "mcp-server");
const target = path.join(root, "out", "mcp-runtime");
const legacyTarget = path.join(root, "out", "mcp");
const entry = path.join(root, "out", "mcp.php");
const withoutVendor = process.argv.includes("--without-vendor");

await rm(legacyTarget, { recursive: true, force: true });
await rm(target, { recursive: true, force: true });
await rm(entry, { force: true });
await mkdir(path.join(target, "data"), { recursive: true });
await Promise.all([
  cp(path.join(root, "public", ".htaccess"), path.join(root, "out", ".htaccess")),
  cp(path.join(source, "public", "index.php"), entry),
  cp(path.join(source, "public", ".htaccess"), path.join(target, ".htaccess")),
  cp(path.join(source, "src"), path.join(target, "src"), { recursive: true }),
  cp(path.join(root, "public", "ai", "mcp-data.json"), path.join(target, "data", "mcp-data.json")),
]);

if (!withoutVendor) {
  await access(path.join(source, "vendor", "autoload.php"));
  await cp(path.join(source, "vendor"), path.join(target, "vendor"), { recursive: true });
}

console.log(`Packaged MCP server in ${target} with entry ${entry}${withoutVendor ? " without vendor" : ""}.`);
