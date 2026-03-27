import { test, expect } from "@playwright/test";

/**
 * Content correctness tests: verify key copy and links on critical pages
 * render correctly in the browser.
 */

test.describe("Paragon CLI overview content", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/paragon/overview");
  });

  test("shows npm install command", async ({ page }) => {
    await expect(
      page.getByText(/npm i -g @polarityinc\/paragon/)
    ).toBeVisible();
  });

  test("shows model table with paragon-fast", async ({ page }) => {
    await expect(page.getByText("paragon-fast")).toBeVisible();
  });

  test("shows keyboard shortcuts table", async ({ page }) => {
    await expect(page.getByText(/ctrl\+p/i).first()).toBeVisible();
  });
});

test.describe("Testing overview content", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/testing/overview");
  });

  test("shows test types: Code Tests and E2E Tests", async ({ page }) => {
    await expect(page.getByText(/Code Tests/i)).toBeVisible();
    await expect(page.getByText(/E2E Tests/i)).toBeVisible();
  });

  test("shows supported frameworks mention", async ({ page }) => {
    await expect(page.getByText(/vitest|jest|pytest/i).first()).toBeVisible();
  });

  test("shows key features table", async ({ page }) => {
    await expect(page.getByText(/Test Runner/i)).toBeVisible();
    await expect(page.getByText(/Evolving Tests/i)).toBeVisible();
  });
});

test.describe("Dashboard overview quick start steps", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/overview");
  });

  test("shows install CLI step", async ({ page }) => {
    await expect(page.getByText(/Install the Paragon CLI/i)).toBeVisible();
  });

  test("shows npm install code block", async ({ page }) => {
    await expect(
      page.getByText(/npm i -g @polarityinc\/paragon/).first()
    ).toBeVisible();
  });
});

test.describe("E2E testing page content", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/paragon/e2e-testing");
  });

  test("shows paragon test command", async ({ page }) => {
    await expect(page.getByText(/paragon test/i).first()).toBeVisible();
  });

  test("shows --headed flag documentation", async ({ page }) => {
    await expect(page.getByText(/--headed/i)).toBeVisible();
  });

  test("shows --url flag documentation", async ({ page }) => {
    await expect(page.getByText(/--url/i)).toBeVisible();
  });

  test("shows default playwright configuration table", async ({ page }) => {
    await expect(
      page.getByText(/Default Playwright Configuration/i)
    ).toBeVisible();
  });
});

test.describe("FAQ content", () => {
  test("contact support email is present", async ({ page }) => {
    await page.goto("/faq");
    await expect(page.locator('a[href*="mailto:"]').first()).toBeVisible();
  });

  test("CLI section exists", async ({ page }) => {
    await page.goto("/faq");
    await expect(page.getByText(/Paragon CLI/i).first()).toBeVisible();
  });

  test("troubleshooting section exists", async ({ page }) => {
    await page.goto("/faq");
    await expect(page.getByText(/Troubleshooting/i)).toBeVisible();
  });
});

test.describe("Navigation sidebar links", () => {
  test("sidebar contains Dashboard group", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Dashboard").first()).toBeVisible();
  });

  test("sidebar contains Paragon CLI group", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Paragon CLI/i).first()).toBeVisible();
  });

  test("clicking Overview in CLI group navigates correctly", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .locator("nav")
      .getByText(/Overview/i)
      .first()
      .click();
    await expect(page).toHaveURL(/\//);
  });
});

test.describe("External links", () => {
  test("GitHub app installation link is correct", async ({ page }) => {
    await page.goto("/");
    const link = page.locator(
      'a[href*="github.com/apps/paragon-review/installations"]'
    );
    await expect(link.first()).toBeVisible();
  });

  test("support email link exists on the page", async ({ page }) => {
    await page.goto("/");
    const emailLink = page.locator('a[href*="mailto:support@polarity.cc"]');
    await expect(emailLink.first()).toBeVisible();
  });
});
