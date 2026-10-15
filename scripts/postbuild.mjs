import fs from "node:fs";
import path from "node:path";

const candidates = [
  path.resolve("dist/server/wrangler.json"),
  path.resolve("dist/server/wrangler.jsonc"),
  path.resolve(".wrangler/deploy/config.json")
];

for (const filePath of candidates) {
  if (fs.existsSync(filePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      let modified = false;

      if (Array.isArray(data.compatibility_flags)) {
        const uniqueFlags = [...new Set(data.compatibility_flags)];
        if (uniqueFlags.length !== data.compatibility_flags.length) {
          data.compatibility_flags = uniqueFlags;
          modified = true;
        }
      }

      if (data.name && data.name !== "alex-panel-portal") {
        data.name = "alex-panel-portal";
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
        console.log(`[postbuild] Sanitized ${filePath}`);
      }
    } catch (err) {
      console.warn(`[postbuild] Could not parse ${filePath}:`, err.message);
    }
  }
}
