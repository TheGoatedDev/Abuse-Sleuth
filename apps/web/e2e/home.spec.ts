import { expect, test } from "@playwright/test";

test("Navigate from Home to Pricing", async ({ page }) => {
    await page.goto("/");

    // create a locator
    const pricing = page.locator("a", { hasText: "Pricing" });

    // Expect an attribute "to be strictly equal" to the value.
    await expect(pricing).toHaveAttribute("href", "/pricing");

    // Click the get started link.
    await pricing.click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*pricing/);
});

test("Navigate from Home to Login when not logged in", async ({ page }) => {
    await page.goto("/");

    // create a locator
    const login = page.locator("a", { hasText: "Login / Signup" });

    // Expect an attribute "to be strictly equal" to the value.
    await expect(login).toHaveAttribute("href", "/auth/signin");

    await login.click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*\/auth\/signin/);
});
