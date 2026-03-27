import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

/**
 * Structural integrity tests: verify that every page referenced in docs.json
 * exists as an .mdx file on disk and has valid frontmatter.
 *
 * These tests do not require a running server.
 */

const ROOT = path.resolve(__dirname, "../..");

function readDocsJson() {
  const raw = fs.readFileSync(path.join(ROOT, "docs.json"), "utf-8");
  return JSON.parse(raw);
}

function collectPages(obj: unknown, pages: string[] = []): string[] {
  if (Array.isArray(obj)) {
    obj.forEach((item) => collectPages(item, pages));
  } else if (obj && typeof obj === "object") {
    const record = obj as Record<string, unknown>;
    if (typeof record["page"] === "string") {
      pages.push(record["page"]);
    }
    if (typeof record["pages"] !== "undefined") {
      collectPages(record["pages"], pages);
    }
    if (typeof record["groups"] !== "undefined") {
      collectPages(record["groups"], pages);
    }
    if (typeof record["tabs"] !== "undefined") {
      collectPages(record["tabs"], pages);
    }
    if (typeof record["navigation"] !== "undefined") {
      collectPages(record["navigation"], pages);
    }
  }
  return pages;
}

function resolvePagePath(page: string): string {
  return path.join(ROOT, `${page}.mdx`);
}

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line
      .slice(colonIdx + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    result[key] = value;
  }
  return result;
}

test.describe("docs.json structural integrity", () => {
  let docsJson: ReturnType<typeof readDocsJson>;
  let pages: string[];

  test.beforeAll(() => {
    docsJson = readDocsJson();
    pages = collectPages(docsJson.navigation);
    // Also handle top-level pages array if present
    if (Array.isArray(docsJson.navigation?.tabs)) {
      for (const tab of docsJson.navigation.tabs) {
        collectPages(tab, pages);
      }
    }
    // Deduplicate
    pages = [...new Set(pages)];
  });

  test("docs.json is valid JSON with required fields", () => {
    expect(docsJson).toBeTruthy();
    expect(typeof docsJson.name).toBe("string");
    expect(docsJson.navigation).toBeTruthy();
  });

  test("docs.json has a name field set to Paragon", () => {
    expect(docsJson.name).toBe("Paragon");
  });

  test("docs.json defines at least one navigation tab", () => {
    expect(Array.isArray(docsJson.navigation?.tabs)).toBe(true);
    expect(docsJson.navigation.tabs.length).toBeGreaterThan(0);
  });

  test("all pages referenced in docs.json exist as .mdx files", () => {
    const missing: string[] = [];
    for (const page of pages) {
      const filePath = resolvePagePath(page);
      if (!fs.existsSync(filePath)) {
        missing.push(`${page}.mdx`);
      }
    }
    expect(missing, `Missing .mdx files: ${missing.join(", ")}`).toHaveLength(
      0
    );
  });

  test("all .mdx pages have a title in frontmatter", () => {
    const missing: string[] = [];
    for (const page of pages) {
      const filePath = resolvePagePath(page);
      if (!fs.existsSync(filePath)) continue; // caught above
      const content = fs.readFileSync(filePath, "utf-8");
      const fm = parseFrontmatter(content);
      if (!fm["title"]) {
        missing.push(page);
      }
    }
    expect(
      missing,
      `Pages missing frontmatter title: ${missing.join(", ")}`
    ).toHaveLength(0);
  });

  test("all .mdx pages have a description in frontmatter", () => {
    const missing: string[] = [];
    for (const page of pages) {
      const filePath = resolvePagePath(page);
      if (!fs.existsSync(filePath)) continue;
      const content = fs.readFileSync(filePath, "utf-8");
      const fm = parseFrontmatter(content);
      if (!fm["description"]) {
        missing.push(page);
      }
    }
    expect(
      missing,
      `Pages missing frontmatter description: ${missing.join(", ")}`
    ).toHaveLength(0);
  });

  test("no .mdx files have empty content beyond frontmatter", () => {
    const empty: string[] = [];
    for (const page of pages) {
      const filePath = resolvePagePath(page);
      if (!fs.existsSync(filePath)) continue;
      const content = fs.readFileSync(filePath, "utf-8");
      const bodyStart = content.indexOf("---", 3);
      const body =
        bodyStart !== -1 ? content.slice(bodyStart + 3).trim() : content.trim();
      if (body.length === 0) {
        empty.push(page);
      }
    }
    expect(empty, `Pages with empty body: ${empty.join(", ")}`).toHaveLength(0);
  });

  test("logo files referenced in docs.json exist", () => {
    const lightLogo = docsJson.logo?.light?.replace(/^\//, "");
    const darkLogo = docsJson.logo?.dark?.replace(/^\//, "");
    if (lightLogo) {
      expect(
        fs.existsSync(path.join(ROOT, lightLogo)),
        `Light logo not found: ${lightLogo}`
      ).toBe(true);
    }
    if (darkLogo) {
      expect(
        fs.existsSync(path.join(ROOT, darkLogo)),
        `Dark logo not found: ${darkLogo}`
      ).toBe(true);
    }
  });

  test("favicon referenced in docs.json exists", () => {
    const favicon = docsJson.favicon?.replace(/^\//, "");
    if (favicon) {
      expect(
        fs.existsSync(path.join(ROOT, favicon)),
        `Favicon not found: ${favicon}`
      ).toBe(true);
    }
  });

  test("global CSS file referenced in docs.json exists", () => {
    const css = docsJson.styling?.global?.replace(/^\//, "");
    if (css) {
      expect(
        fs.existsSync(path.join(ROOT, css)),
        `Global CSS not found: ${css}`
      ).toBe(true);
    }
  });
});
