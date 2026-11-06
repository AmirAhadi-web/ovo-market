import { expect, test } from "@playwright/test";

/**
 * Main user journey:
 * Homepage → Product detail → Add to cart → Cart → Checkout → Demo success
 *
 * Requires network access to dummyjson.com (or the local fallback catalog).
 */
test("complete demo purchase journey", async ({ page }) => {
  // Homepage
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /پیشنهاد شگفت‌انگیز/ })).toBeVisible();

  // Open the first product card
  await page.locator('article a[href*="/products/"]').first().click();
  await expect(page).toHaveURL(/\/products\/\d+/);

  // Add to cart from the detail page
  const addButton = page.getByRole("button", { name: "افزودن به سبد خرید" }).first();
  await expect(addButton).toBeVisible();
  if (await addButton.isEnabled()) {
    await addButton.click();
  }

  // Cart
  await page.goto("/cart");
  await expect(page.getByRole("heading", { name: /سبد خرید/ })).toBeVisible();

  // If the chosen product was out of stock, cart may be empty — add via listing instead
  if (await page.getByText("سبد خرید شما خالی است").isVisible()) {
    await page.goto("/products");
    await page.locator('button[aria-label="افزودن به سبد خرید"]').first().click();
    await page.goto("/cart");
  }
  await expect(page.getByText("خلاصه سفارش")).toBeVisible();

  // Checkout — contact/shipping form
  await page.getByRole("link", { name: "ادامه فرایند خرید" }).click();
  await expect(page).toHaveURL(/\/checkout/);
  await page.getByPlaceholder("مثال: سارا محمدی").fill("مشتری تستی");
  await page.getByPlaceholder("09123456789").fill("09123456789");
  await page.getByPlaceholder("مثال: تهران").first().fill("تهران");
  await page.locator('input[placeholder="مثال: تهران"]').nth(1).fill("تهران");
  await page.getByPlaceholder("خیابان، کوچه، پلاک، واحد").fill("خیابان آزادی، پلاک ۱۰، واحد ۲");
  await page.getByRole("button", { name: "ادامه" }).click();

  // Review step → payment step
  await expect(page.getByText("کالاهای سفارش")).toBeVisible();
  await page.getByRole("button", { name: "انتخاب روش پرداخت" }).click();

  // Simulated successful payment
  await page.getByRole("button", { name: "شبیه‌سازی پرداخت موفق" }).click();
  await expect(page).toHaveURL(/\/checkout\/success\?ref=MK-/, { timeout: 15_000 });
  await expect(page.getByText("سفارش شما با موفقیت ثبت شد")).toBeVisible();
});
