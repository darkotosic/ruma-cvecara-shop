import { Browser, expect, test } from "@playwright/test";

async function openWithLocation(browser: Browser, baseURL: string, host: string) {
  const context = await browser.newContext({
    baseURL,
    extraHTTPHeaders: { host },
  });
  const page = await context.newPage();

  return { context, page };
}

test.describe("E2E tok kupovine", () => {
  test("dodavanje proizvoda i mock checkout", async ({ page, baseURL }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Pastelni shop/i })).toBeVisible();

    await page.getByRole("link", { name: "Shop" }).click();
    await page.waitForURL("**/shop");

    const addButton = page.getByRole("button", { name: /Dodaj u korpu/i }).first();
    await addButton.click();

    await expect(page.getByRole("heading", { name: /Sažetak porudžbine/i })).toBeVisible();
    await page.getByRole("link", { name: /Nastavi na checkout/i }).click();
    await page.waitForURL("**/checkout");

    await page.getByLabel("Ime i prezime").fill("Test Kupac");
    await page.getByLabel("Email").fill("kupac@example.com");
    await page.getByLabel("Telefon").fill("+381601234567");
    await page.getByLabel("Adresa dostave").fill("Glavna 1");

    await page.getByRole("button", { name: /Pošalji porudžbinu/i }).click();
    await expect(page.getByText(/Porudžbina je zabeležena/i)).toBeVisible();
  });

  test("promena grada kroz host prikazuje lokalizovane podatke", async ({ browser, baseURL }) => {
    const { page, context } = await openWithLocation(browser, baseURL!, "novi-sad.cvecara.shop");

    await page.goto("/");
    await expect(page.getByText(/novi-sad\.cvecara\.shop/i)).toBeVisible();
    await expect(page.getByText(/Novi Sad|novi sad/)).toBeVisible();

    await context.close();
  });
});
