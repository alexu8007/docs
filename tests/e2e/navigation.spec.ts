import { test, expect } from "@playwright/test";

/**
 * Navigation & page-load tests for the Paragon docs site.
 * Runs against the Mintlify dev server at http://localhost:3000
 * (or BASE_URL env var).
 */

test.describe("Home page", () => {
  test("loads with correct title and hero content", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Paragon/i);
    await expect(
      page.getByRole("heading", { name: /Overview/i }).first()
    ).toBeVisible();
  });

  test("shows core feature links", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/AI-powered QA platform/i)).toBeVisible();
    await expect(page.getByText(/reviews/i).first()).toBeVisible();
    await expect(page.getByText(/testing/i).first()).toBeVisible();
    await expect(page.getByText(/monitoring/i).first()).toBeVisible();
  });

  test("Dashboard CTA button links to home.polarity.cc", async ({ page }) => {
    await page.goto("/");
    const dashboardLink = page.locator('a[href="https://home.polarity.cc"]');
    await expect(dashboardLink.first()).toBeVisible();
  });

  test("Install GitHub App navbar link is present", async ({ page }) => {
    await page.goto("/");
    const installLink = page.locator(
      'a[href*="github.com/apps/paragon-review"]'
    );
    await expect(installLink.first()).toBeVisible();
  });
});

test.describe("Dashboard section", () => {
  test("overview page loads", async ({ page }) => {
    await page.goto("/dashboard/overview");
    await expect(page).toHaveTitle(/Overview/i);
    await expect(
      page.getByText(/Paragon Dashboard/i).first()
    ).toBeVisible();
  });

  test("issues page loads", async ({ page }) => {
    await page.goto("/dashboard/issues");
    await expect(page).toHaveTitle(/Issues/i);
  });

  test("settings page loads", async ({ page }) => {
    await page.goto("/dashboard/settings");
    await expect(page).toHaveTitle(/Settings/i);
  });

  test("integrations page loads", async ({ page }) => {
    await page.goto("/dashboard/integrations");
    await expect(page).toHaveTitle(/Integrations/i);
  });
});

test.describe("Testing section", () => {
  test("testing overview page loads", async ({ page }) => {
    await page.goto("/dashboard/testing/overview");
    await expect(page).toHaveTitle(/Overview/i);
    await expect(page.getByText(/Paragon Testing/i)).toBeVisible();
  });

  test("quickstart page loads", async ({ page }) => {
    await page.goto("/dashboard/testing/quickstart");
    await expect(page).toHaveTitle(/Quickstart/i);
  });

  test("repos page loads", async ({ page }) => {
    await page.goto("/dashboard/testing/repos");
    await expect(page).toHaveTitle(/Repos/i);
  });

  test("generating tests page loads", async ({ page }) => {
    await page.goto("/dashboard/testing/generating");
    await expect(page).toHaveTitle(/Generating/i);
  });

  test("runner page loads", async ({ page }) => {
    await page.goto("/dashboard/testing/runner");
    await expect(page).toHaveTitle(/Runner/i);
  });

  test("evolving page loads", async ({ page }) => {
    await page.goto("/dashboard/testing/evolving");
    await expect(page).toHaveTitle(/Evolving/i);
  });

  test("analytics page loads", async ({ page }) => {
    await page.goto("/dashboard/testing/analytics");
    await expect(page).toHaveTitle(/Analytics/i);
  });
});

test.describe("Monitoring section", () => {
  test("monitoring overview page loads", async ({ page }) => {
    await page.goto("/dashboard/monitoring/overview");
    await expect(page).toHaveTitle(/Overview/i);
  });

  test("monitoring setup page loads", async ({ page }) => {
    await page.goto("/dashboard/monitoring/setup");
    await expect(page).toHaveTitle(/Setup/i);
  });

  test("monitoring creating page loads", async ({ page }) => {
    await page.goto("/dashboard/monitoring/creating");
    await expect(page).toHaveTitle(/Creating/i);
  });

  test("monitoring alerts page loads", async ({ page }) => {
    await page.goto("/dashboard/monitoring/alerts");
    await expect(page).toHaveTitle(/Alerts/i);
  });
});

test.describe("Paragon CLI section", () => {
  test("CLI overview page loads", async ({ page }) => {
    await page.goto("/paragon/overview");
    await expect(page).toHaveTitle(/Overview/i);
    await expect(
      page.getByText(/AI-powered terminal assistant/i).first()
    ).toBeVisible();
  });

  test("CLI overview shows installation command", async ({ page }) => {
    await page.goto("/paragon/overview");
    await expect(
      page.getByText(/npm i -g @polarityinc\/paragon/i)
    ).toBeVisible();
  });

  test("commands page loads", async ({ page }) => {
    await page.goto("/paragon/commands");
    await expect(page).toHaveTitle(/Commands/i);
  });

  test("tools page loads", async ({ page }) => {
    await page.goto("/paragon/tools");
    await expect(page).toHaveTitle(/Tools/i);
  });

  test("e2e-testing page loads", async ({ page }) => {
    await page.goto("/paragon/e2e-testing");
    await expect(page).toHaveTitle(/E2E Testing/i);
    await expect(page.getByText(/Playwright/i).first()).toBeVisible();
  });

  test("auto-test page loads", async ({ page }) => {
    await page.goto("/paragon/auto-test");
    await expect(page).toHaveTitle(/Auto.*[Tt]est/i);
  });

  test("configuration page loads", async ({ page }) => {
    await page.goto("/paragon/configuration");
    await expect(page).toHaveTitle(/Configuration/i);
  });
});

test.describe("AI Tools section", () => {
  test("claude-code page loads", async ({ page }) => {
    await page.goto("/claude-code");
    await expect(page).toHaveTitle(/Claude/i);
  });

  test("cursor page loads", async ({ page }) => {
    await page.goto("/cursor");
    await expect(page).toHaveTitle(/Cursor/i);
  });
});

test.describe("FAQ page", () => {
  test("loads with correct title", async ({ page }) => {
    await page.goto("/faq");
    await expect(page).toHaveTitle(/FAQ/i);
  });

  test("getting started section is visible", async ({ page }) => {
    await page.goto("/faq");
    await expect(page.getByText(/Getting Started/i).first()).toBeVisible();
  });

  test("accordion items expand on click", async ({ page }) => {
    await page.goto("/faq");
    const firstAccordion = page
      .getByText(/How do I get started with Paragon/i)
      .first();
    await expect(firstAccordion).toBeVisible();
    await firstAccordion.click();
    await expect(page.getByText(/Install the GitHub App/i)).toBeVisible();
  });

  test("billing section is visible", async ({ page }) => {
    await page.goto("/faq");
    await expect(page.getByText(/Billing & Credits/i)).toBeVisible();
  });
});

test.describe("Paragon MCP page", () => {
  test("loads", async ({ page }) => {
    await page.goto("/paragon-mcp");
    await expect(page).toHaveTitle(/.+/);
  });
});
