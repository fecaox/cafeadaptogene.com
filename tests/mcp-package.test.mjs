import assert from "node:assert/strict";
import { access, readFile, rm } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import test from "node:test";

const execFileAsync = promisify(execFile);
const root = new URL("../", import.meta.url);

test("construit un paquet MCP sans exposer ses fichiers internes", async () => {
  await rm(new URL("out/mcp/", root), { recursive: true, force: true });
  await execFileAsync(process.execPath, ["scripts/package-mcp-server.mjs", "--without-vendor"], {
    cwd: new URL(".", root),
  });

  const [rootRules, mcpRules, data] = await Promise.all([
    readFile(new URL("out/.htaccess", root), "utf8"),
    readFile(new URL("out/mcp/.htaccess", root), "utf8"),
    readFile(new URL("out/mcp/data/mcp-data.json", root), "utf8"),
  ]);

  assert.match(rootRules, /RewriteRule \^mcp\/?\$ mcp\/index\.php \[L\]/);
  assert.match(mcpRules, /RewriteRule !\^index\.php\$ - \[F,L\]/);
  assert.equal(JSON.parse(data).documents.length, 154);
  await access(new URL("out/mcp/index.php", root));
  await access(new URL("out/mcp/src/KnowledgeBase.php", root));
  await access(new URL("out/mcp/src/Tools.php", root));
  await assert.rejects(access(new URL("out/mcp/vendor/autoload.php", root)));
});
